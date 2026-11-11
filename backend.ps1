# ====================================================
# FairHire Native Local REST API Server
# Powered by Windows System.Net.HttpListener
# Zero installation, zero external dependencies.
# ====================================================

$Port = 5000
$Prefix = "http://localhost:$Port/"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
$DataDir = Join-Path $ProjectRoot "data"
$DbFile = Join-Path $DataDir "fairhire_database.json"

if (-not (Test-Path $DbFile)) {
    Write-Host "Database file not found at $DbFile. Please ensure seed data exists." -ForegroundColor Red
    exit 1
}

function Get-Database {
    $content = Get-Content $DbFile -Raw -Encoding UTF8
    return ($content | ConvertFrom-Json)
}

function Save-Database ($dbObj) {
    $json = $dbObj | ConvertTo-Json -Depth 10
    [System.IO.File]::WriteAllText($DbFile, $json, [System.Text.Encoding]::UTF8)
}

$Listener = New-Object System.Net.HttpListener
$Listener.Prefixes.Add($Prefix)

try {
    $Listener.Start()
} catch {
    Write-Host "Could not start listener on $Prefix : $_" -ForegroundColor Red
    Write-Host "Another process might be using port $Port." -ForegroundColor Yellow
    exit 1
}

Clear-Host
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "      FAIRHIRE LOCAL REST API BACKEND SERVER ONLINE       " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Server URL : $Prefix" -ForegroundColor White
Write-Host "Database   : $DbFile" -ForegroundColor Gray
Write-Host "Status     : Listening for Candidate & HR REST API requests..." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to terminate server." -ForegroundColor DarkGray
Write-Host "==========================================================" -ForegroundColor Cyan

while ($Listener.IsListening) {
    try {
        $Context = $Listener.GetContext()
        $Request = $Context.Request
        $Response = $Context.Response

        # Add CORS Headers for local browser access
        $Response.Headers.Add("Access-Control-Allow-Origin", "*")
        $Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        $Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization")

        # Handle Preflight OPTIONS
        if ($Request.HttpMethod -eq "OPTIONS") {
            $Response.StatusCode = 200
            $Response.Close()
            continue
        }

        $Path = $Request.Url.AbsolutePath
        $Method = $Request.HttpMethod
        $Time = (Get-Date).ToString("HH:mm:ss")
        Write-Host "[$Time] $Method $Path" -ForegroundColor DarkCyan

        $ResponseBody = ""
        $StatusCode = 200

        # Read Request Body if POST / PUT
        $RequestBodyJson = $null
        if ($Request.HasEntityBody) {
            $Reader = New-Object System.IO.StreamReader($Request.InputStream, $Request.ContentEncoding)
            $RawBody = $Reader.ReadToEnd()
            $Reader.Close()
            if ($RawBody) {
                try {
                    $RequestBodyJson = $RawBody | ConvertFrom-Json
                } catch {}
            }
        }

        # ----------------------------------------------------
        # ROUTE 0: Static Web Application & Files (http://localhost:5000/)
        # ----------------------------------------------------
        if ($Method -eq "GET" -and -not ($Path.StartsWith("/api/"))) {
            $rel = if ($Path -eq "/" -or $Path -eq "") { "index.html" } else { $Path.TrimStart('/') }
            $targetFilePath = Join-Path $ProjectRoot $rel
            if (Test-Path $targetFilePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($targetFilePath).ToLower()
                $mimeType = switch ($ext) {
                    ".html" { "text/html; charset=utf-8" }
                    ".htm"  { "text/html; charset=utf-8" }
                    ".css"  { "text/css; charset=utf-8" }
                    ".js"   { "application/javascript; charset=utf-8" }
                    ".json" { "application/json; charset=utf-8" }
                    ".png"  { "image/png" }
                    ".jpg"  { "image/jpeg" }
                    ".svg"  { "image/svg+xml" }
                    ".ico"  { "image/x-icon" }
                    default { "application/octet-stream" }
                }
                $fileBytes = [System.IO.File]::ReadAllBytes($targetFilePath)
                $Response.StatusCode = 200
                $Response.ContentType = $mimeType
                $Response.ContentLength64 = $fileBytes.Length
                $Response.OutputStream.Write($fileBytes, 0, $fileBytes.Length)
                $Response.Close()
                continue
            }
        }

        # ----------------------------------------------------
        # ROUTE 1: GET /api/health
        # ----------------------------------------------------
        if ($Path -eq "/api/health" -and $Method -eq "GET") {
            $ResponseBody = @{
                status = "ok"
                server = "FairHire REST API Engine"
                version = "4.0.0"
                database = "fairhire_database.json"
                timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
            } | ConvertTo-Json
        }

        # ----------------------------------------------------
        # ROUTE 2: GET /api/jobs
        # ----------------------------------------------------
        elseif ($Path -eq "/api/jobs" -and $Method -eq "GET") {
            $db = Get-Database
            $ResponseBody = $db.jobs | ConvertTo-Json -Depth 5
        }

        # ----------------------------------------------------
        # ROUTE 3: GET /api/candidates
        # ----------------------------------------------------
        elseif ($Path -eq "/api/candidates" -and $Method -eq "GET") {
            $db = Get-Database
            $ResponseBody = $db.candidates | ConvertTo-Json -Depth 6
        }

        # ----------------------------------------------------
        # ROUTE 4: GET /api/applications
        # ----------------------------------------------------
        elseif ($Path -eq "/api/applications" -and $Method -eq "GET") {
            $db = Get-Database
            $ResponseBody = $db.applications | ConvertTo-Json -Depth 6
        }

        # ----------------------------------------------------
        # ROUTE 5: POST /api/applications (Submit Application)
        # ----------------------------------------------------
        elseif ($Path -eq "/api/applications" -and $Method -eq "POST") {
            if ($null -ne $RequestBodyJson) {
                $db = Get-Database
                $newApp = $RequestBodyJson

                if (-not $newApp.id) {
                    $newApp | Add-Member -NotePropertyName "id" -NotePropertyValue ("app-" + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()) -Force
                }
                if (-not $newApp.appliedDate) {
                    $newApp | Add-Member -NotePropertyName "appliedDate" -NotePropertyValue ((Get-Date).ToString("yyyy-MM-dd")) -Force
                }
                if (-not $newApp.status) {
                    $newApp | Add-Member -NotePropertyName "status" -NotePropertyValue "APPLIED" -Force
                }

                # Check duplicate
                $existing = $db.applications | Where-Object { 
                    ($_.jobId -eq $newApp.jobId -or $_.jobTitle -eq $newApp.jobTitle) -and 
                    ($_.candidateId -eq $newApp.candidateId -or $_.candidateEmail -eq $newApp.candidateEmail)
                }

                if ($existing) {
                    $StatusCode = 409
                    $ResponseBody = @{
                        success = $false
                        isDuplicate = $true
                        message = "You have already applied for this position."
                    } | ConvertTo-Json
                } else {
                    $appsList = [System.Collections.ArrayList]@($db.applications)
                    $appsList.Insert(0, $newApp)
                    $db.applications = $appsList
                    Save-Database $db

                    Write-Host "  -> Created Application: $($newApp.id) for $($newApp.jobTitle)" -ForegroundColor Green

                    $ResponseBody = @{
                        success = $true
                        application = $newApp
                        message = "Application submitted and saved to FairHire database successfully!"
                    } | ConvertTo-Json
                }
            } else {
                $StatusCode = 400
                $ResponseBody = @{ error = "Invalid payload" } | ConvertTo-Json
            }
        }

        # ----------------------------------------------------
        # ROUTE 6: PUT / POST /api/applications/status (Update Status & Interview)
        # ----------------------------------------------------
        elseif (($Path -like "/api/applications/*/status" -or $Path -eq "/api/applications/status") -and ($Method -eq "POST" -or $Method -eq "PUT")) {
            if ($null -ne $RequestBodyJson) {
                $db = Get-Database
                $targetId = $RequestBodyJson.applicationId
                if (-not $targetId -and $Path -match "/api/applications/([^/]+)/status") {
                    $targetId = $Matches[1]
                }

                $matched = $false
                foreach ($app in $db.applications) {
                    if ($app.id -eq $targetId -or $app.candidateId -eq $targetId) {
                        $matched = $true
                        if ($RequestBodyJson.status) {
                            $app.status = $RequestBodyJson.status
                        }
                        if ($RequestBodyJson.hrFeedback) {
                            $app.hrFeedback = $RequestBodyJson.hrFeedback
                        }
                        if ($RequestBodyJson.interviewRequest) {
                            $app | Add-Member -NotePropertyName "interviewRequest" -NotePropertyValue $RequestBodyJson.interviewRequest -Force
                        }
                        break
                    }
                }

                if ($matched) {
                    Save-Database $db
                    Write-Host "  -> Updated Application $targetId status to $($RequestBodyJson.status)" -ForegroundColor Green
                    $ResponseBody = @{
                        success = $true
                        message = "Application updated successfully in FairHire database."
                    } | ConvertTo-Json
                } else {
                    $StatusCode = 404
                    $ResponseBody = @{ success = $false; message = "Application not found." } | ConvertTo-Json
                }
            }
        }

        # ----------------------------------------------------
        # ROUTE 7: GET /api/interviews
        # ----------------------------------------------------
        elseif ($Path -eq "/api/interviews" -and $Method -eq "GET") {
            $db = Get-Database
            $ResponseBody = $db.interviews | ConvertTo-Json -Depth 5
        }

        # ----------------------------------------------------
        # ROUTE 8: GET /api/notifications
        # ----------------------------------------------------
        elseif ($Path -eq "/api/notifications" -and $Method -eq "GET") {
            $db = Get-Database
            $ResponseBody = $db.notifications | ConvertTo-Json -Depth 5
        }

        # ----------------------------------------------------
        # ROUTE 9: 404 Fallback
        # ----------------------------------------------------
        else {
            $StatusCode = 404
            $ResponseBody = @{
                error = "Endpoint not found"
                path = $Path
                method = $Method
            } | ConvertTo-Json
        }

        # Emit JSON response
        $Response.StatusCode = $StatusCode
        $Response.ContentType = "application/json; charset=utf-8"
        $Buffer = [System.Text.Encoding]::UTF8.GetBytes($ResponseBody)
        $Response.ContentLength64 = $Buffer.Length
        $Response.OutputStream.Write($Buffer, 0, $Buffer.Length)
        $Response.Close()

    } catch {
        Write-Host "Server handling error: $_" -ForegroundColor Red
        try {
            $Response.StatusCode = 500
            $Response.Close()
        } catch {}
    }
}
