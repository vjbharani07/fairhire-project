/**
 * FairHire Master Application Controller
 * Handles routing, view transitions, reactive DOM updates, forms, and modals.
 */

// ==========================================
// QUESTION BANK FOR SKILL ASSESSMENT (TASK 1)
// 32 High-Quality Questions across 8 Domains
// ==========================================
const ASSESSMENT_QUESTIONS = [
  // 1. Programming Fundamentals & OOP
  {
    id: 'q1',
    category: 'Programming Fundamentals',
    difficulty: 'Easy',
    question: 'Which programming concept refers to bundling data and the methods that operate on that data into a single unit or class?',
    options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Compilation'],
    correctAnswer: 1, // Encapsulation
    explanation: 'Encapsulation bundles data and methods together inside a class, restricting direct external access to internal implementation details.'
  },
  {
    id: 'q2',
    category: 'Programming Fundamentals',
    difficulty: 'Easy',
    question: 'What is the primary characteristic of a recursive function?',
    options: [
      'It compiles faster than an iterative loop',
      'It calls itself with a terminating base condition',
      'It cannot access variables declared outside its scope',
      'It must always return a floating-point value'
    ],
    correctAnswer: 1, // Base condition
    explanation: 'A recursive function solves a problem by calling itself on smaller sub-problems until reaching a base condition that terminates recursion.'
  },
  {
    id: 'q3',
    category: 'Programming Fundamentals',
    difficulty: 'Medium',
    question: 'In object-oriented programming, what is method overriding?',
    options: [
      'Defining multiple methods with the same name but different parameter lists in the same class',
      'Allowing a subclass to provide a specific implementation of a method already defined in its superclass',
      'Overwriting the memory allocation of a variable at runtime',
      'Converting a private method to public during execution'
    ],
    correctAnswer: 1, // Method overriding
    explanation: 'Method overriding occurs when a child class provides a custom implementation of a method that is already defined in its parent class.'
  },
  {
    id: 'q16',
    category: 'Programming Fundamentals',
    difficulty: 'Medium',
    question: 'In Java and modern OOP, what is a primary distinction between an abstract class and an interface?',
    options: [
      'An interface can declare instance fields, whereas an abstract class cannot',
      'A class can implement multiple interfaces, but extend only one abstract class',
      'Abstract classes cannot have constructors or concrete methods',
      'Interfaces only permit private methods and cannot be referenced as types'
    ],
    correctAnswer: 1, // Multiple interfaces vs single class extension
    explanation: 'Java supports multiple inheritance of type through interfaces, but single inheritance of implementation through classes.'
  },
  {
    id: 'q17',
    category: 'Programming Fundamentals',
    difficulty: 'Easy',
    question: 'What is the primary role of the Java Virtual Machine (JVM) Garbage Collector?',
    options: [
      'To compile Java bytecode directly into native machine code at startup',
      'To automatically reclaim heap memory occupied by unreachable, unreferenced objects',
      'To verify digital signatures on downloaded JAR files',
      'To resolve syntax errors during class loading'
    ],
    correctAnswer: 1, // Garbage Collection
    explanation: 'The JVM Garbage Collector periodically identifies and cleans up objects on the heap that have no active references, preventing memory leaks.'
  },
  {
    id: 'q18',
    category: 'Programming Fundamentals',
    difficulty: 'Medium',
    question: 'In C++, what is the consequence of failing to use the delete operator on memory allocated with new?',
    options: [
      'A compile-time syntax error occurs',
      'A memory leak, where allocated heap memory remains inaccessible and unreclaimed',
      'The operating system immediately halts the CPU',
      'The pointer variable is reset to address zero'
    ],
    correctAnswer: 1, // Memory leak
    explanation: 'Manual dynamic memory allocation in C/C++ requires explicit deallocation. Omitting delete produces memory leaks that consume process heap space.'
  },
  {
    id: 'q19',
    category: 'Programming Fundamentals',
    difficulty: 'Medium',
    question: 'What causes a Segmentation Fault (core dumped) in C or C++ programs?',
    options: [
      'Executing a loop that runs more than 10,000 iterations',
      'Attempting to read or write to memory that the program does not have permission to access',
      'Dividing an integer by a non-zero floating point value',
      'Defining more than ten global variables in one source file'
    ],
    correctAnswer: 1, // Segmentation fault
    explanation: 'A segmentation fault is raised by hardware memory management units when a process attempts to access unmapped or protected virtual memory addresses.'
  },
  {
    id: 'q31',
    category: 'Programming Fundamentals',
    difficulty: 'Medium',
    question: 'What is the fundamental difference between an Operating System Process and a Thread?',
    options: [
      'Threads have independent virtual memory address spaces, while processes share heap memory',
      'A process has its own isolated address space, while threads within a process share the same memory space',
      'Processes can only execute on single-core processors',
      'Threads cannot perform input/output operations'
    ],
    correctAnswer: 1, // Process vs Thread
    explanation: 'Processes are independent execution units with private address spaces; threads are lightweight execution paths sharing the address space of their parent process.'
  },

  // 2. Python Basics
  {
    id: 'q4',
    category: 'Python Basics',
    difficulty: 'Easy',
    question: 'Which of the following built-in data types in Python is immutable?',
    options: ['list', 'dict', 'tuple', 'set'],
    correctAnswer: 2, // tuple
    explanation: 'Tuples cannot be altered, appended, or modified in place after creation, making them immutable in Python.'
  },
  {
    id: 'q5',
    category: 'Python Basics',
    difficulty: 'Easy',
    question: 'What will print(type([1, 2, 3])) output in Python 3?',
    options: ["<class 'array'>", "<class 'list'>", "<class 'tuple'>", "<class 'collection'>"],
    correctAnswer: 1, // <class 'list'>
    explanation: 'Square brackets [...] define a standard Python list, so its type is <class \'list\'>.'
  },
  {
    id: 'q6',
    category: 'Python Basics',
    difficulty: 'Medium',
    question: 'What is the correct syntax for a Python list comprehension that squares all even numbers in numbers = [1, 2, 3, 4]?',
    options: [
      '[x**2 for x in numbers if x % 2 == 0]',
      '[for x in numbers: x**2 if x % 2 == 0]',
      '(x**2 if x % 2 == 0 in numbers)',
      'numbers.map(lambda x: x**2 if x % 2 == 0)'
    ],
    correctAnswer: 0, // [x**2 for x in numbers if x % 2 == 0]
    explanation: 'List comprehensions follow the syntax [expression for item in iterable if condition].'
  },
  {
    id: 'q20',
    category: 'Python Basics',
    difficulty: 'Easy',
    question: 'In Python, which built-in function returns an iterator of tuples containing counter indices and iterable items?',
    options: ['range()', 'enumerate()', 'zip()', 'count()'],
    correctAnswer: 1, // enumerate
    explanation: 'enumerate(iterable, start=0) returns tuples of (index, item), allowing clean indexing inside loops.'
  },
  {
    id: 'q21',
    category: 'Python Basics',
    difficulty: 'Medium',
    question: 'What makes a Python Generator function different from a regular function?',
    options: [
      'It executes concurrently on GPU cores',
      'It uses the yield keyword to produce values lazily on demand without holding the full sequence in memory',
      'It cannot accept arguments or parameters',
      'It must always return an integer value'
    ],
    correctAnswer: 1, // yield lazy evaluation
    explanation: 'Generators pause execution at yield and resume upon the next next() call, saving memory when processing massive sequences.'
  },
  {
    id: 'q22',
    category: 'Python Basics',
    difficulty: 'Easy',
    question: 'What is the average-case time complexity of looking up a key in a Python dictionary?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 0, // O(1)
    explanation: 'Python dictionaries are implemented using optimized hash tables, providing O(1) average-case key lookups and insertions.'
  },

  // 3. SQL Fundamentals & DBMS
  {
    id: 'q7',
    category: 'SQL Fundamentals',
    difficulty: 'Easy',
    question: 'Which SQL clause is used to filter individual rows before any groupings are applied?',
    options: ['GROUP BY', 'HAVING', 'WHERE', 'ORDER BY'],
    correctAnswer: 2, // WHERE
    explanation: 'The WHERE clause filters individual rows before grouping occurs, whereas HAVING filters aggregated groups.'
  },
  {
    id: 'q8',
    category: 'SQL Fundamentals',
    difficulty: 'Easy',
    question: 'What is the purpose of a PRIMARY KEY constraint in a relational database table?',
    options: [
      'To allow duplicate values for rapid indexing',
      'To uniquely identify each record in a table without accepting NULL values',
      'To link two unrelated tables together automatically',
      'To encrypt sensitive column data'
    ],
    correctAnswer: 1, // PRIMARY KEY
    explanation: 'A PRIMARY KEY uniquely identifies each record in a table and strictly prohibits NULL values.'
  },
  {
    id: 'q9',
    category: 'SQL Fundamentals',
    difficulty: 'Medium',
    question: 'Which type of SQL JOIN returns all rows from the left table and matched rows from the right table?',
    options: ['INNER JOIN', 'LEFT JOIN', 'FULL OUTER JOIN', 'CROSS JOIN'],
    correctAnswer: 1, // LEFT JOIN
    explanation: 'A LEFT JOIN returns all records from the left table, and matching records from the right table (with NULLs for unmatched rows).'
  },
  {
    id: 'q23',
    category: 'SQL Fundamentals',
    difficulty: 'Hard',
    question: 'In relational database normalization, what condition is required for a relation to be in Third Normal Form (3NF)?',
    options: [
      'It must be in 2NF and have zero transitive dependencies for non-prime attributes',
      'It must not have any foreign key relationships',
      'All column values must be serialized JSON strings',
      'Every column must be indexed with a composite B-Tree'
    ],
    correctAnswer: 0, // 3NF transitive dependency
    explanation: 'A relation is in 3NF if it is in 2NF and every non-prime attribute is non-transitively dependent on every candidate key.'
  },
  {
    id: 'q24',
    category: 'SQL Fundamentals',
    difficulty: 'Easy',
    question: 'What does the "A" stand for in the ACID transaction properties of relational databases?',
    options: ['Asynchronous', 'Atomicity', 'Availability', 'Authentication'],
    correctAnswer: 1, // Atomicity
    explanation: 'Atomicity guarantees that all operations within a database transaction either complete entirely or are fully rolled back (all-or-nothing).'
  },
  {
    id: 'q25',
    category: 'SQL Fundamentals',
    difficulty: 'Medium',
    question: 'How does a B-Tree index accelerate SELECT queries on large database tables?',
    options: [
      'By keeping keys sorted in a balanced tree that reduces disk block reads to O(log n)',
      'By converting all queries into asynchronous background jobs',
      'By deleting duplicate rows automatically during execution',
      'By storing all table rows directly inside the browser cache'
    ],
    correctAnswer: 0, // B-Tree O(log n)
    explanation: 'B-Tree indexes maintain sorted keys across balanced tree nodes, allowing the database engine to locate records in logarithmic time.'
  },
  {
    id: 'q32',
    category: 'SQL Fundamentals',
    difficulty: 'Easy',
    question: 'Which development practice is most effective in preventing SQL Injection vulnerabilities in backend applications?',
    options: [
      'Using Parameterized Queries and Prepared Statements with ORM frameworks',
      'Validating user inputs solely using client-side JavaScript regex',
      'Encoding user passwords in Base64 strings',
      'Storing database connection credentials in public HTML comments'
    ],
    correctAnswer: 0, // Prepared Statements
    explanation: 'Prepared Statements treat user parameters strictly as literal values rather than executable code, completely neutralizing SQL injection.'
  },

  // 4. Data Structures, Algorithms & Problem Solving
  {
    id: 'q10',
    category: 'Problem Solving',
    difficulty: 'Easy',
    question: 'What is the worst-case time complexity of Linear Search in an unsorted array of n elements?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 2, // O(n)
    explanation: 'In the worst case, the target element is at the very end of the array or absent, requiring inspecting all n elements.'
  },
  {
    id: 'q11',
    category: 'Problem Solving',
    difficulty: 'Medium',
    question: 'Which data structure follows the First-In, First-Out (FIFO) principle?',
    options: ['Stack', 'Queue', 'Binary Tree', 'Max-Heap'],
    correctAnswer: 1, // Queue
    explanation: 'A Queue processes items in the exact arrival order, adhering to First-In, First-Out (FIFO).'
  },
  {
    id: 'q12',
    category: 'Problem Solving',
    difficulty: 'Medium',
    question: 'If a sorted array contains 1,024 elements, what is the maximum number of comparisons required by Binary Search?',
    options: ['10', '32', '512', '1,024'],
    correctAnswer: 0, // 10
    explanation: 'Binary search halves the search space at each iteration: log₂(1024) = 10 maximum comparisons.'
  },
  {
    id: 'q26',
    category: 'Problem Solving',
    difficulty: 'Easy',
    question: 'In a singly linked list with a reference to the head pointer, what is the time complexity to insert a new node at the head?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 0, // O(1)
    explanation: 'Inserting at the head requires updating the new node\'s next pointer and reassigning the head pointer, taking constant O(1) time.'
  },
  {
    id: 'q27',
    category: 'Problem Solving',
    difficulty: 'Medium',
    question: 'Which technique is commonly used to resolve hash collisions in a Hash Table?',
    options: [
      'Separate Chaining (Linked Lists/Buckets) or Open Addressing (Linear Probing)',
      'Binary Search Tree inversion',
      'Depth-First Search recursion',
      'Fast Fourier Transform'
    ],
    correctAnswer: 0, // Chaining or Open Addressing
    explanation: 'Separate Chaining places colliding keys in linked buckets, while Open Addressing probes subsequent table slots.'
  },
  {
    id: 'q28',
    category: 'Problem Solving',
    difficulty: 'Medium',
    question: 'What is the average-case time complexity of the QuickSort algorithm on an array of n elements?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 1, // O(n log n)
    explanation: 'With balanced partitioning, QuickSort divides the array into halves across log n levels, resulting in O(n log n) average time complexity.'
  },

  // 5. Web Development Basics & Computer Fundamentals
  {
    id: 'q13',
    category: 'Web Development Basics',
    difficulty: 'Easy',
    question: 'What does HTML stand for?',
    options: [
      'Hyper Trainer Marking Language',
      'HyperText Markup Language',
      'HighText Machine Language',
      'Hyperlinks Text Management Level'
    ],
    correctAnswer: 1, // HyperText Markup Language
    explanation: 'HTML stands for HyperText Markup Language, the fundamental markup language for web pages.'
  },
  {
    id: 'q14',
    category: 'Web Development Basics',
    difficulty: 'Easy',
    question: 'In CSS, which property controls the internal spacing between an element\'s content and its border?',
    options: ['margin', 'padding', 'spacing', 'outline'],
    correctAnswer: 1, // padding
    explanation: 'Padding creates internal space inside an element\'s border, whereas margin creates space outside the border.'
  },
  {
    id: 'q15',
    category: 'Web Development Basics',
    difficulty: 'Medium',
    question: 'Which JavaScript method is used to attach an event listener function to an HTML element?',
    options: [
      'element.addEventListener(\'click\', handler)',
      'element.attachListener(\'click\', handler)',
      'element.listenEvent(\'click\', handler)',
      'element.bindHandler(\'click\', handler)'
    ],
    correctAnswer: 0, // element.addEventListener
    explanation: 'addEventListener() is the standard W3C DOM method for attaching event listeners to DOM elements.'
  },
  {
    id: 'q29',
    category: 'Web Development Basics',
    difficulty: 'Medium',
    question: 'What is the purpose of Cross-Origin Resource Sharing (CORS) in web browsers?',
    options: [
      'A browser security mechanism that allows or restricts resources requested from a different origin domain',
      'To compress image files before sending over HTTP',
      'To automatically synchronize cookies across all open tabs',
      'To convert client JavaScript code into WebAssembly'
    ],
    correctAnswer: 0, // CORS
    explanation: 'CORS uses HTTP headers to tell browsers whether a web application running at one origin has permission to access resources from a different origin.'
  },
  {
    id: 'q30',
    category: 'Web Development Basics',
    difficulty: 'Easy',
    question: 'In RESTful web API standards, which HTTP status code indicates that a resource has been successfully created?',
    options: ['200 OK', '201 Created', '204 No Content', '304 Not Modified'],
    correctAnswer: 1, // 201 Created
    explanation: 'HTTP 201 Created signifies that the request succeeded and resulted in the creation of one or more new resources on the server.'
  }
];

// ==========================================
// JOB-SPECIFIC CASE ASSESSMENT TEMPLATES (TASK 2)
// Linked directly to real job catalog
// ==========================================
const CASE_ASSESSMENT_TEMPLATES = {
  'job-1': {
    jobId: 'job-1',
    roleTitle: 'Software Developer',
    company: 'Zoho',
    scenarioTitle: 'High-Throughput Multi-Tenant SaaS Architecture',
    scenarioText: 'You are part of the core platform engineering group at Zoho building a high-throughput, multi-tenant Employee Directory & Workflow System. The system serves 50,000 requests/minute, backed by Java microservices, PostgreSQL, and Redis cache. As traffic surges, customer organizations report intermittent 504 timeouts, tenant data bleeding concerns, and database deadlocks.',
    questions: [
      {
        question: 'Which HTTP method and status code is most appropriate when an external client sends a payload to create a new employee record?',
        options: ['POST with 201 Created', 'PUT with 200 OK', 'GET with 204 No Content', 'PATCH with 302 Found'],
        correctAnswer: 0,
        explanation: 'In RESTful design, creating a new resource is performed via POST, and successful creation returns HTTP 201 Created with the resource URI.'
      },
      {
        question: 'High-volume employee lookup queries are causing slow response times on PostgreSQL. Which database optimization strategy should be implemented first?',
        options: [
          'Add a composite index on frequently queried columns (tenant_id, department_id, employee_id)',
          'Remove all foreign key constraints to speed up writes',
          'Switch the primary database to an unindexed document store',
          'Disable table vacuuming and auto-analyze routines'
        ],
        correctAnswer: 0,
        explanation: 'Creating composite B-Tree indexes on tenant_id and search predicates dramatically accelerates query execution from table scans to fast index range scans.'
      },
      {
        question: 'To guarantee strict tenant isolation in a shared database schema, which implementation pattern prevents Cross-Tenant Data Leaks?',
        options: [
          'Enforce Tenant ID filtering in the ORM/Data Access Layer and enable PostgreSQL Row-Level Security (RLS)',
          'Store tenant names inside client-side localStorage and trust client request headers',
          'Rely solely on frontend UI dropdown filters to restrict tenant views',
          'Create a single global admin user with full bypass privileges for all API requests'
        ],
        correctAnswer: 0,
        explanation: 'Row-Level Security (RLS) in the database combined with mandatory tenant context injection in the repository layer guarantees that no query can return records belonging to another tenant.'
      },
      {
        question: 'An API endpoint GET /api/employees is responding in 4.8 seconds instead of under 200ms. What is the most systematic first debugging step?',
        options: [
          'Inspect execution metrics, check database query plans with EXPLAIN ANALYZE, and trace slow database queries',
          'Immediately restart all application servers and clear browser cache',
          'Increase the server hardware RAM without profiling the code',
          'Rewrite the entire backend in another programming language'
        ],
        correctAnswer: 0,
        explanation: 'Profiling with APM tools and inspecting PostgreSQL EXPLAIN ANALYZE reveals whether the latency bottleneck stems from missing indexes, N+1 query patterns, or unoptimized joins.'
      },
      {
        question: 'When two HR managers concurrently update the same employee payroll record, a race condition occurs. Which concurrency control mechanism should be applied?',
        options: [
          'Optimistic Locking with a version column (@Version in JPA)',
          'Ignoring the update from the first manager silently',
          'Disabling all database transactions entirely',
          'Executing both updates asynchronously without verification'
        ],
        correctAnswer: 0,
        explanation: 'Optimistic locking verifies that the record version has not changed between reading and writing, rejecting stale updates with an OptimisticLockException to maintain data integrity.'
      },
      {
        question: 'Which testing level is required to verify that the employee service correctly integrates with the real database and cache layer before production release?',
        options: [
          'Automated Integration Testing with Testcontainers running real PostgreSQL and Redis instances',
          'Manual browser clicking by the developer alone',
          'Unit testing with all database calls completely mocked away',
          'Compiling the code with zero unit or integration tests'
        ],
        correctAnswer: 0,
        explanation: 'Integration tests executed against real containerized dependencies (e.g. Testcontainers) validate schema migrations, connection pooling, and actual transactional boundaries.'
      }
    ]
  },
  'job-2': {
    jobId: 'job-2',
    roleTitle: 'Systems Engineer',
    company: 'Infosys',
    scenarioTitle: 'Enterprise Banking Batch & Event Streaming Modernization',
    scenarioText: 'An enterprise banking partner requires migrating legacy batch accounting into an event-driven microservices architecture. High reliability, zero financial reconciliation errors, idempotent transactions, and 99.99% availability are required.',
    questions: [
      {
        question: 'Which messaging architecture is best suited for decoupling transaction generation from downstream audit and reporting services?',
        options: [
          'Publish-Subscribe event log (e.g., Apache Kafka or RabbitMQ topic exchanges)',
          'Direct synchronous HTTP/1.1 REST calls between every service pair',
          'Writing temporary CSV files to shared FTP folders hourly',
          'Polling the primary database every 500 milliseconds'
        ],
        correctAnswer: 0,
        explanation: 'A partitioned distributed commit log (Kafka) decouples producers from multiple independent consumer groups, ensuring replayability and backpressure resilience.'
      },
      {
        question: 'How do you prevent duplicate financial debits if a network glitch causes an API client to retry a money transfer request?',
        options: [
          'Enforce Idempotency Keys stored with transactional locks in the payment ledger',
          'Disable retry mechanisms entirely on client mobile apps',
          'Assign random transaction IDs on every retry attempt',
          'Allow all requests through and balance accounts at end of year'
        ],
        correctAnswer: 0,
        explanation: 'An idempotency key uniquely identifies the business intent; subsequent duplicate requests return the cached original result without re-executing the transfer.'
      },
      {
        question: 'During peak trading hours, an API gateway encounters cascading timeouts from an overloaded backend service. Which pattern mitigates this?',
        options: [
          'Circuit Breaker pattern with fallback responses and exponential backoff',
          'Increasing gateway timeout from 30 seconds to 10 minutes',
          'Opening infinite connection pools to force requests through',
          'Terminating SSL certificates to reduce CPU load'
        ],
        correctAnswer: 0,
        explanation: 'The Circuit Breaker pattern trips open when failures cross a threshold, quickly failing fast or serving fallback data to prevent exhausting thread pools.'
      },
      {
        question: 'Which distributed transaction pattern coordinates multi-service debit and credit operations without 2-phase locking (2PC)?',
        options: [
          'Saga Pattern with compensating transactions (orchestrated or choreographed)',
          'Shared database transaction across all independent microservices',
          'Local transactions without any rollback capability',
          'Global mutex lock spanning all physical servers'
        ],
        correctAnswer: 0,
        explanation: 'The Saga pattern breaks transactions into local steps across services; if a step fails, compensating transactions are triggered to undo preceding state changes.'
      },
      {
        question: 'What is the primary benefit of deploying canary or blue-green releases in enterprise banking systems?',
        options: [
          'Zero-downtime deployments with instant automated rollback if error rates spike',
          'Eliminating the need for automated test suites',
          'Halving the total cloud infrastructure cost during deployments',
          'Bypassing regulatory compliance checks'
        ],
        correctAnswer: 0,
        explanation: 'Canary/blue-green releases route traffic gradually to new versions, ensuring zero user downtime and immediate instant rollback upon detecting regressions.'
      },
      {
        question: 'Which metric best reflects the operational health of a microservice beyond raw CPU utilization?',
        options: [
          'Golden Signals: Latency, Traffic, Error rate, and Saturation',
          'Total lines of source code in the git repository',
          'Number of comments written in code reviews',
          'The compile time of the application JAR'
        ],
        correctAnswer: 0,
        explanation: 'The Google SRE Four Golden Signals (Latency, Traffic, Errors, Saturation) provide immediate, actionable insight into system health and user experience.'
      }
    ]
  },
  'job-3': {
    jobId: 'job-3',
    roleTitle: 'Software Engineer (Early Career)',
    company: 'Google',
    scenarioTitle: 'Globally Distributed Low-Latency Search Cache',
    scenarioText: 'Google Search Infrastructure is building a globally distributed query cache and index routing service handling billions of queries per day with strict p99 sub-15ms latency requirements.',
    questions: [
      {
        question: 'Which consensus algorithm is commonly used to maintain consistent replicated logs across distributed state machine nodes?',
        options: ['Raft or Paxos', 'Dijkstra shortest path', 'Kruskal minimum spanning tree', 'SHA-256 hashing'],
        correctAnswer: 0,
        explanation: 'Raft and Paxos are foundational consensus algorithms ensuring distributed clusters reach agreement on state even in the presence of node failures and network partitions.'
      },
      {
        question: 'To implement an in-memory LRU (Least Recently Used) cache with O(1) time complexity for both get and put operations, which data structure combination is optimal?',
        options: [
          'Hash Map combined with a Doubly Linked List',
          'Single sorted array with Binary Search',
          'Binary Search Tree with inorder traversal',
          'Stack with depth-first search'
        ],
        correctAnswer: 0,
        explanation: 'The Hash Map provides O(1) key lookup, while the Doubly Linked List maintains access order with O(1) removal and insertion at the head.'
      },
      {
        question: 'How do you handle clock skew across geo-distributed servers when ordering causal events without synchronized atomic clocks?',
        options: [
          'Logical Clocks (Lamport Timestamps or Vector Clocks)',
          'Reading system local time from /dev/urandom',
          'Relying on client mobile device system clocks',
          'Ignoring timestamp order entirely'
        ],
        correctAnswer: 0,
        explanation: 'Lamport timestamps and Vector clocks track causality and happens-before relationships in distributed systems without depending on physical wall-clock synchronization.'
      },
      {
        question: 'A distributed hash ring experiences key hotspots due to non-uniform key distribution. What technique resolves this imbalance?',
        options: [
          'Virtual Nodes (vnodes) mapping multiple points on the hash ring to each physical node',
          'Reducing the number of servers to one single large mainframe',
          'Using linear probing on a single central server',
          'Assigning all keys to node 0 alphabetically'
        ],
        correctAnswer: 0,
        explanation: 'Virtual nodes distribute load uniformly across the consistent hash ring, mitigating hotspots and ensuring smooth rebalancing when nodes join or leave.'
      },
      {
        question: 'What is the primary trade-off highlighted by the CAP Theorem for distributed data stores during a network partition (P)?',
        options: [
          'Choosing between Consistency (C) and Availability (A)',
          'Choosing between CPU speed and RAM bandwidth',
          'Choosing between open-source and proprietary software',
          'Choosing between SQL and NoSQL syntax'
        ],
        correctAnswer: 0,
        explanation: 'The CAP theorem states that when a network partition (P) occurs, a distributed system must choose between serving consistent data (C) or remaining available (A).'
      },
      {
        question: 'Which algorithmic pattern controls client request spikes at the edge while allowing short bursts of traffic?',
        options: [
          'Token Bucket or Leaky Bucket Rate Limiting algorithm',
          'Bubble Sort algorithm',
          'Round-Robin DNS alone with no quotas',
          'First-Come, First-Served queue with unbounded memory'
        ],
        correctAnswer: 0,
        explanation: 'The Token Bucket algorithm regulates traffic flow to a fixed average rate while gracefully accommodating configurable bursts up to bucket capacity.'
      }
    ]
  },
  'job-4': {
    jobId: 'job-4',
    roleTitle: 'Associate Cloud Engineer',
    company: 'AWS',
    scenarioTitle: 'Enterprise Cloud Migration & Containerization',
    scenarioText: 'A global retail partner is migrating a monolithic e-commerce application to AWS with containerized ECS/EKS clusters, Aurora PostgreSQL multi-AZ databases, and automated CI/CD pipelines.',
    questions: [
      {
        question: 'Which AWS service provides serverless compute for running containerized microservices without managing EC2 instances?',
        options: ['AWS Fargate', 'Amazon S3', 'Amazon Route 53', 'AWS Snowball'],
        correctAnswer: 0,
        explanation: 'AWS Fargate is a serverless, pay-as-you-go compute engine that lets you run containers on ECS or EKS without having to manage physical EC2 virtual machines.'
      },
      {
        question: 'How should sensitive database credentials be securely provided to containerized microservices in production?',
        options: [
          'Store in AWS Secrets Manager or Parameter Store and inject via IAM task roles at runtime',
          'Hardcode usernames and passwords in the public Dockerfile',
          'Commit plain-text credentials into a public GitHub repository',
          'Store credentials in unencrypted cookies on user browsers'
        ],
        correctAnswer: 0,
        explanation: 'AWS Secrets Manager securely stores, encrypts with KMS, and automatically rotates database credentials, injecting them dynamically via IAM role policies.'
      },
      {
        question: 'How should a secure Virtual Private Cloud (VPC) network architecture be structured for a three-tier web application?',
        options: [
          'Public subnets for Application Load Balancers, private subnets for application containers, and isolated subnets for databases',
          'Place all databases and backend servers on the public Internet with open port 0-65535',
          'Disable security groups and route tables across the entire VPC',
          'Route all internal traffic through unencrypted public IP addresses'
        ],
        correctAnswer: 0,
        explanation: 'Strict tiering places public ALBs in public subnets with Internet Gateways, while app containers and databases remain isolated in private subnets via NAT Gateways.'
      },
      {
        question: 'During high traffic events, what mechanism enables ECS container tasks to scale horizontally in response to CPU/memory utilization?',
        options: [
          'Target Tracking Auto Scaling Policies via CloudWatch alarms',
          'Manual rebooting of EC2 instances during business hours',
          'Writing a cron script that deletes containers every 10 minutes',
          'Restricting web traffic to 10 simultaneous visitors'
        ],
        correctAnswer: 0,
        explanation: 'Target Tracking Auto Scaling dynamically increases or decreases ECS task counts to keep aggregate CPU or memory utilization at target thresholds.'
      },
      {
        question: 'What is the primary role of an AWS Application Load Balancer (ALB) in a containerized environment?',
        options: [
          'Layer 7 path-based routing, health checks, and distributing traffic across dynamic container ports',
          'Compiling Java bytecode into container images',
          'Generating relational database tables automatically',
          'Encrypting local hard disks on developer laptops'
        ],
        correctAnswer: 0,
        explanation: 'ALBs operate at Layer 7 (HTTP/HTTPS) and route requests based on URL paths and host headers to dynamic target groups with continuous automated health checks.'
      },
      {
        question: 'How does an Amazon Aurora Multi-AZ deployment achieve high availability and fault tolerance?',
        options: [
          'Replicates 6 copies of data across 3 Availability Zones with sub-minute automated failover',
          'Backs up data to external tape drives once per month',
          'Runs on a single server without any read replicas',
          'Requires manual database restore from archives upon failure'
        ],
        correctAnswer: 0,
        explanation: 'Amazon Aurora automatically replicates volume data six ways across three AZs and continuously synchronizes with low-latency Aurora Read Replicas.'
      }
    ]
  },
  'job-5': {
    jobId: 'job-5',
    roleTitle: 'Java Developer',
    company: 'ABC Technologies',
    scenarioTitle: 'Fintech Transaction Processing Microservice',
    scenarioText: 'A fintech payment gateway is launching a high-concurrency Spring Boot fund transfer service. The API must handle peer-to-peer wallet balances with ACID compliance, idempotency tokens, and sub-80ms execution.',
    questions: [
      {
        question: 'In Spring Boot, which annotation manages transactional atomicity and automatically rolls back changes when a RuntimeException occurs?',
        options: ['@Transactional', '@Async', '@Component', '@CrossOrigin'],
        correctAnswer: 0,
        explanation: '@Transactional configures Spring AOP proxy interception that begins a database transaction, commits on success, and triggers a rollback upon unchecked runtime exceptions.'
      },
      {
        question: 'Which Spring Security filter chain component validates incoming stateless JSON Web Tokens (JWT) on protected API routes?',
        options: [
          'OncePerRequestFilter parsing the Authorization: Bearer <token> header',
          'BasicAuthenticationFilter using cleartext HTTP passwords',
          'HTML Form Login page redirecting to external identity providers',
          'A servlet filter that disables HTTPS encryption'
        ],
        correctAnswer: 0,
        explanation: 'A custom OncePerRequestFilter extracts the Bearer token, validates the HMAC/RSA signature, and populates the SecurityContextHolder with the candidate Authentication principal.'
      },
      {
        question: 'Under high concurrent payment requests, threads are getting blocked waiting for database connections. Which HikariCP tuning parameter should be investigated?',
        options: [
          'maximumPoolSize, connectionTimeout, and leakDetectionThreshold',
          'server.port and spring.banner.location',
          'logging.level.org.springframework=DEBUG',
          'spring.jpa.show-sql=true'
        ],
        correctAnswer: 0,
        explanation: 'HikariCP connection pool exhaustion is mitigated by sizing maximumPoolSize appropriately for hardware cores, optimizing slow queries, and setting leakDetectionThreshold.'
      },
      {
        question: 'How does Spring Data JPA prevent SQL Injection attacks when performing queries?',
        options: [
          'By using PreparedStatements with parameterized bind variables for method names and @Query annotations',
          'By concatenating unescaped strings directly into raw SQL strings',
          'By running queries through client-side browser regex',
          'By converting all strings to uppercase'
        ],
        correctAnswer: 0,
        explanation: 'Spring Data JPA uses parameterized PreparedStatements under the hood, ensuring user inputs are treated strictly as literal data rather than executable SQL commands.'
      },
      {
        question: 'Which Spring Boot Actuator endpoint should container orchestration platforms query to verify if an application is ready to receive traffic?',
        options: ['/actuator/health/readiness', '/actuator/beans', '/actuator/env', '/actuator/metrics'],
        correctAnswer: 0,
        explanation: 'Kubernetes readiness probes check /actuator/health/readiness to ensure internal components (database connections, caches) are fully initialized before routing traffic.'
      },
      {
        question: 'What is the purpose of using Data Transfer Objects (DTOs) with Spring Validation (@Valid) instead of exposing JPA Entities directly?',
        options: [
          'Separates API contract from database schema and prevents mass assignment/over-posting security flaws',
          'Slows down compilation to catch runtime exceptions',
          'Forces all database columns to be strings',
          'Eliminates the need for REST controllers'
        ],
        correctAnswer: 0,
        explanation: 'DTOs isolate internal persistence models from public API contracts, validate input constraints (@NotNull, @Size), and prevent unauthorized field tampering.'
      }
    ]
  },
  'data-analyst': {
    jobId: 'data-analyst',
    roleTitle: 'Data Analyst',
    company: 'FinData Analytics',
    scenarioTitle: 'Customer Churn & Revenue Analytics Engine',
    scenarioText: 'A high-growth e-commerce platform needs to identify churn indicators, model customer lifetime value (LTV), and build automated SQL pipelines for executive decision dashboards.',
    questions: [
      {
        question: 'Which SQL window function is used to calculate cumulative running revenue partitioned by customer region?',
        options: [
          'SUM(revenue) OVER (PARTITION BY region ORDER BY order_date)',
          'COUNT(revenue) GROUP BY region',
          'AVG(revenue) HAVING region IS NOT NULL',
          'ROW_NUMBER() OVER (ORDER BY region DESC)'
        ],
        correctAnswer: 0,
        explanation: 'Window functions with OVER (PARTITION BY ... ORDER BY ...) calculate running aggregates across rows without collapsing individual records.'
      },
      {
        question: 'When analyzing customer order amounts, you discover several extreme outliers. Which metric is most resistant to extreme skew?',
        options: ['Median', 'Arithmetic Mean', 'Standard Deviation', 'Variance'],
        correctAnswer: 0,
        explanation: 'The median represents the 50th percentile and is robust against extreme outliers, whereas the mean and variance are heavily skewed by extreme values.'
      },
      {
        question: 'A dataset has 5% missing values in a customer age column. What is the soundest initial exploratory data analysis step?',
        options: [
          'Analyze whether missingness is Missing at Random (MAR) and inspect distribution before imputing or dropping',
          'Delete all customer rows containing any missing value immediately',
          'Replace all missing values with 0 without investigation',
          'Duplicate existing records to fill the gaps'
        ],
        correctAnswer: 0,
        explanation: 'Investigating the missingness mechanism (MCAR, MAR, MNAR) ensures imputation or exclusion does not introduce systematic sampling bias.'
      },
      {
        question: 'Which statistical test determines whether a 15% promotional discount caused a statistically significant increase in conversion rates between test and control groups?',
        options: ['Two-sample t-test or Z-test for proportions', 'K-Means clustering', 'Dijkstra shortest path', 'PCA Dimensionality Reduction'],
        correctAnswer: 0,
        explanation: 'A two-sample proportion test evaluates the null hypothesis that test and control groups share the same underlying conversion probability.'
      },
      {
        question: 'In a Star Schema data warehouse, what is the primary structural difference between a Fact Table and a Dimension Table?',
        options: [
          'Fact tables contain quantitative business metrics and foreign keys; dimension tables contain descriptive context attributes',
          'Fact tables contain employee names; dimension tables contain server IP addresses',
          'Dimension tables must never have primary keys',
          'Fact tables cannot exceed 100 rows in size'
        ],
        correctAnswer: 0,
        explanation: 'Fact tables store measurable business events (sales, revenue) and foreign keys, surrounded by descriptive dimension tables (customer, date, product).'
      },
      {
        question: 'What type of data visualization is most effective for visualizing the distribution, quartiles, and outliers of a continuous numerical variable?',
        options: ['Box Plot (Box-and-Whisker)', 'Pie Chart', 'Donut Chart', 'Radar Chart'],
        correctAnswer: 0,
        explanation: 'Box plots clearly present minimum, first quartile, median, third quartile, maximum, and individual statistical outliers.'
      }
    ]
  }
};

function getCaseTemplateForJob(jobIdOrJob, optionalTitle) {
  let jobId = '';
  let title = '';
  if (typeof jobIdOrJob === 'string') {
    jobId = jobIdOrJob;
    title = (optionalTitle || '').toLowerCase();
  } else if (jobIdOrJob && typeof jobIdOrJob === 'object') {
    jobId = jobIdOrJob.id || '';
    title = (jobIdOrJob.title || '').toLowerCase();
  }
  let tpl = CASE_ASSESSMENT_TEMPLATES[jobId];
  if (!tpl) {
    if (title.includes('data') || title.includes('analyst')) tpl = CASE_ASSESSMENT_TEMPLATES['data-analyst'];
    else if (title.includes('cloud') || title.includes('aws')) tpl = CASE_ASSESSMENT_TEMPLATES['job-4'];
    else if (title.includes('system') || title.includes('infosys')) tpl = CASE_ASSESSMENT_TEMPLATES['job-2'];
    else if (title.includes('java')) tpl = CASE_ASSESSMENT_TEMPLATES['job-5'];
    else if (title.includes('google') || title.includes('distributed')) tpl = CASE_ASSESSMENT_TEMPLATES['job-3'];
    else tpl = CASE_ASSESSMENT_TEMPLATES['job-1'];
  }
  if (tpl) {
    tpl.scenario = tpl.scenario || tpl.scenarioText;
    tpl.title = tpl.title || tpl.scenarioTitle;
  }
  return tpl;
}

// Global expose of assessment question bank for grading
window.FairHireAssessmentPool = ASSESSMENT_QUESTIONS;

/**
 * Deterministic Fisher-Yates array shuffling
 */
function fairhireShuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates an active 15-question assessment session from the 32-question bank.
 * - Randomly selects exactly 15 questions without replacement
 * - Shuffles the question order
 * - Shuffles options (A/B/C/D) while preserving the correct answer mapping
 */
function generateAssessmentSession(questionsPool, count = 15) {
  const poolCopy = [...questionsPool];
  const shuffledPool = fairhireShuffle(poolCopy);
  const picked = shuffledPool.slice(0, Math.min(count, poolCopy.length));

  // Shuffle question presentation order
  const ordered = fairhireShuffle(picked);

  // Shuffle options for each question preserving correct answer mapping
  return ordered.map((q, idx) => {
    const originalOptions = q.options;
    const originalCorrectIndex = q.correctAnswer;

    const optionItems = originalOptions.map((text, oIdx) => ({
      text,
      isCorrect: oIdx === originalCorrectIndex
    }));

    const shuffledOptions = fairhireShuffle(optionItems);
    const newCorrectIndex = shuffledOptions.findIndex(item => item.isCorrect);

    return {
      id: q.id,
      originalId: q.id,
      sessionIndex: idx,
      category: q.category,
      difficulty: q.difficulty,
      question: q.question,
      options: shuffledOptions.map(item => item.text),
      correctAnswer: newCorrectIndex,
      explanation: q.explanation
    };
  });
}

// App Controller
class FairHireApp {
  constructor() {
    this.currentQuestionIndex = 0;
    this.userAnswers = {};
    this.currentAssessmentQuestions = null;
    this.activeCaseAssessment = null;
    this.selectedJobForApply = null;
    this.selectedApplicationForHR = null;
    this.pendingHRDecisionStatus = null;
    this.currentSkillGapRole = 'Software Developer';
    this.activeWebcamStream = null;
    this.activeScreenStream = null;
    this.audioContext = null;
    this.audioMeterAnimationId = null;
    this.isMicMuted = false;
    this.isCamHidden = false;
    this.virtualCanvasAnimationId = null;
    this.init();
  }

  init() {
    this.bindEvents();
    this.render();
  }

  // ==========================================
  // NAVIGATION & VIEW ROUTING
  // ==========================================
  setRole(role) {
    window.appStore.update(s => {
      s.activeRole = role;
    });
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setCandidateTab(tab) {
    window.appStore.update(s => {
      s.activeCandidateTab = tab;
    });
    this.renderCandidatePortal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setHRTab(tab) {
    window.appStore.update(s => {
      s.activeHRTab = tab;
    });
    this.renderHRPortal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================
  // EVENT BINDINGS
  // ==========================================
  bindEvents() {
    // Global Navigation & Role Switcher
    document.querySelectorAll('[data-switch-role]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const role = el.getAttribute('data-switch-role');
        this.setRole(role);
      });
    });

    // Reset Demo Button
    const resetBtn = document.getElementById('reset-demo-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset demo state to initial Ragav V profile and default jobs?')) {
          window.appStore.resetToDefault();
          this.showToast('Demo data reset to initial baseline.', 'success');
          this.render();
        }
      });
    }

    // Chatbot Toggle
    const coachToggleBtn = document.getElementById('coach-toggle-btn');
    const coachCloseBtn = document.getElementById('coach-close-btn');
    const coachWindow = document.getElementById('coach-window');

    if (coachToggleBtn && coachWindow) {
      coachToggleBtn.addEventListener('click', () => {
        coachWindow.classList.toggle('hidden');
      });
    }
    if (coachCloseBtn && coachWindow) {
      coachCloseBtn.addEventListener('click', () => {
        coachWindow.classList.add('hidden');
      });
    }

    // Chatbot Prompts
    document.querySelectorAll('.coach-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.textContent.trim();
        this.sendCoachMessage(text);
      });
    });

    // Chatbot Input
    const coachForm = document.getElementById('coach-form');
    const coachInput = document.getElementById('coach-input');
    if (coachForm && coachInput) {
      coachForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = coachInput.value.trim();
        if (query) {
          this.sendCoachMessage(query);
          coachInput.value = '';
        }
      });
    }

    // Candidate Login Form
    const candLoginForm = document.getElementById('candidate-login-form');
    if (candLoginForm) {
      candLoginForm.addEventListener('submit', (e) => {
        this.candidateLogin(e);
      });
    }

    // Save Profile Form
    const profileForm = document.getElementById('candidate-profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveCandidateProfile();
      });
    }

    // Add Skill Button
    const addSkillBtn = document.getElementById('add-skill-btn');
    if (addSkillBtn) {
      addSkillBtn.addEventListener('click', () => {
        this.addSkillFromInput();
      });
    }

    // Add Certification Button
    const addCertBtn = document.getElementById('add-cert-btn');
    if (addCertBtn) {
      addCertBtn.addEventListener('click', () => {
        this.addCertificationFromInput();
      });
    }

    // Application Modal Submit
    const appModalSubmit = document.getElementById('submit-application-btn');
    if (appModalSubmit) {
      appModalSubmit.addEventListener('click', () => {
        this.confirmAndSubmitApplication();
      });
    }

    // HR Decision Modal Submit
    const hrDecisionSubmit = document.getElementById('hr-submit-decision-btn');
    if (hrDecisionSubmit) {
      hrDecisionSubmit.addEventListener('click', () => {
        this.submitHRDecision();
      });
    }
  }

  // ==========================================
  // MASTER RENDER
  // ==========================================
  render() {
    const state = window.appStore.getState();
    const role = state.activeRole;

    // View Containers
    const landingView = document.getElementById('view-landing');
    const candidateView = document.getElementById('view-candidate');
    const hrView = document.getElementById('view-hr');

    // Role Indicator Badges in Top Bar
    document.querySelectorAll('[data-role-indicator]').forEach(el => {
      if (el.getAttribute('data-role-indicator') === role) {
        el.classList.add('bg-blue-600', 'text-white');
        el.classList.remove('text-slate-400', 'hover:text-white');
      } else {
        el.classList.remove('bg-blue-600', 'text-white');
        el.classList.add('text-slate-400', 'hover:text-white');
      }
    });

    if (role === 'landing') {
      landingView.classList.remove('hidden');
      candidateView.classList.add('hidden');
      hrView.classList.add('hidden');
      this.renderLanding();
    } else if (role === 'candidate') {
      landingView.classList.add('hidden');
      candidateView.classList.remove('hidden');
      hrView.classList.add('hidden');
      this.renderCandidatePortal();
    } else if (role === 'hr') {
      landingView.classList.add('hidden');
      candidateView.classList.add('hidden');
      hrView.classList.remove('hidden');
      this.renderHRPortal();
    }
  }

  // ==========================================
  // 1. LANDING PAGE
  // ==========================================
  renderLanding() {
    // Ensure smooth jump links and transparent modal links work
    const transModalBtn = document.getElementById('open-transparency-modal-btn');
    if (transModalBtn) {
      transModalBtn.onclick = () => this.openModal('transparency-modal');
    }
  }

  // Candidate Auth Handlers
  candidateLogin(e) {
    if (e && e.preventDefault) e.preventDefault();
    const emailInput = document.getElementById('cand-email-input');
    const passInput = document.getElementById('cand-password-input');
    const errorEl = document.getElementById('cand-login-error');

    const email = emailInput ? emailInput.value.trim() : '';
    const password = passInput ? passInput.value.trim() : '';

    if (!email || !password) {
      if (errorEl) {
        errorEl.textContent = 'Please enter both an email address and a password.';
        errorEl.classList.remove('hidden');
      }
      this.showToast('Please enter both email and password.', 'error');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      if (errorEl) {
        errorEl.textContent = 'Please enter a valid email address format (e.g. student@college.edu).';
        errorEl.classList.remove('hidden');
      }
      this.showToast('Please enter a valid email address.', 'error');
      return;
    }

    if (errorEl) errorEl.classList.add('hidden');

    // Retrieve or initialize candidate record
    const profile = window.appStore.getCandidateProfile(email);

    window.appStore.update(s => {
      s.candidateAuth.isLoggedIn = true;
      s.candidateAuth.email = profile.email;
      s.candidateAuth.name = profile.name;
      s.candidate = profile;
    });

    this.showToast(`Welcome to Candidate Portal, ${profile.name}!`, 'success');
    this.renderCandidatePortal();
  }

  loginDemoCandidate(presetEmail = 'ragav.v@student.edu') {
    const emailInput = document.getElementById('cand-email-input');
    const passInput = document.getElementById('cand-password-input');
    if (emailInput) emailInput.value = presetEmail;
    if (passInput) passInput.value = 'student123';
    this.candidateLogin();
  }

  exitCandidatePortal() {
    window.appStore.update(s => {
      s.candidateAuth.isLoggedIn = false;
    });
    this.showToast('Logged out of Candidate Portal.', 'info');
    this.setRole('landing');
  }

  // HR Recruiter Workspace Handlers
  enterRecruiterWorkspace() {
    window.appStore.update(s => {
      s.hrAuth.isLoggedIn = true;
    });
    this.showToast('Entered Recruiter Workspace • SkillMatch Enterprise', 'success');
    this.renderHRPortal();
  }

  exitRecruiterWorkspace() {
    window.appStore.update(s => {
      s.hrAuth.isLoggedIn = false;
    });
    this.showToast('Exited Recruiter Workspace.', 'info');
    this.setRole('landing');
  }

  // ==========================================
  // 2. CANDIDATE PORTAL
  // ==========================================
  renderCandidatePortal() {
    const state = window.appStore.getState();
    const candGate = document.getElementById('candidate-auth-gate');
    const candDashboard = document.getElementById('candidate-auth-dashboard');

    const isCandAuth = state.candidateAuth && state.candidateAuth.isLoggedIn;
    if (!isCandAuth) {
      if (candGate) candGate.classList.remove('hidden');
      if (candDashboard) candDashboard.classList.add('hidden');
      return;
    }

    if (candGate) candGate.classList.add('hidden');
    if (candDashboard) candDashboard.classList.remove('hidden');

    const cand = state.candidate || window.appStore.getCandidateProfile(state.candidateAuth.email);
    const activeTab = state.activeCandidateTab;

    // Update Header and Sidebar Profile Info
    const initials = (cand.name || 'Candidate')
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const avatarEls = document.querySelectorAll('.cand-avatar-initials');
    avatarEls.forEach(el => el.textContent = initials);

    const nameEls = document.querySelectorAll('.cand-display-name');
    nameEls.forEach(el => el.textContent = cand.name || 'Candidate');

    const emailEls = document.querySelectorAll('.cand-display-email');
    emailEls.forEach(el => el.textContent = cand.email || '');

    const idEl = document.getElementById('cand-sidebar-id');
    if (idEl) idEl.textContent = `${cand.id || 'FH1001'} • Candidate`;

    // Update Sidebar Active Links
    document.querySelectorAll('.candidate-nav-item').forEach(item => {
      const tab = item.getAttribute('data-tab');
      if (tab === activeTab) {
        item.classList.add('cand-nav-active');
        item.classList.remove('text-slate-400', 'hover:bg-white/5', 'hover:text-white', 'text-slate-600', 'hover:bg-slate-100');
      } else {
        item.classList.remove('cand-nav-active');
        item.classList.add('text-slate-400', 'hover:bg-white/5', 'hover:text-white');
      }
      item.onclick = (e) => {
        e.preventDefault();
        this.setCandidateTab(tab);
      };
    });

    // Sub views
    const subViews = {
      'dashboard': 'candidate-tab-dashboard',
      'instructions': 'candidate-tab-instructions',
      'assessments': 'candidate-tab-assessments',
      'results': 'candidate-tab-results',
      'profile': 'candidate-tab-profile',
      'score': 'candidate-tab-score',
      'jobs': 'candidate-tab-jobs',
      'applications': 'candidate-tab-applications',
      'skillgap': 'candidate-tab-skillgap',
      'transparency': 'candidate-tab-transparency'
    };

    Object.keys(subViews).forEach(tabKey => {
      const el = document.getElementById(subViews[tabKey]);
      if (el) {
        if (tabKey === activeTab) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      }
    });

    // Render Sub Tab Content
    if (activeTab === 'dashboard') this.renderCandidateDashboard();
    else if (activeTab === 'instructions') this.renderAssessmentInstructions();
    else if (activeTab === 'assessments') this.renderAssessmentQuiz();
    else if (activeTab === 'results') this.renderAssessmentResults();
    else if (activeTab === 'profile') this.renderCandidateProfileForm();
    else if (activeTab === 'score') this.renderScoreBreakdownPage();
    else if (activeTab === 'jobs') this.renderAvailableJobs();
    else if (activeTab === 'applications') this.renderMyApplications();
    else if (activeTab === 'skillgap') this.renderSkillGapAnalyzer();
  }

  // Candidate Dashboard Summary
  renderCandidateDashboard() {
    const state = window.appStore.getState();
    const cand = state.candidate || window.appStore.getCandidateProfile(state.candidateAuth.email);
    const hasAssessment = cand.assessmentStatus === 'Completed' && cand.latestAssessment;
    const latest = cand.latestAssessment;

    // 1. Welcome Section
    const welcomeTitle = document.getElementById('dash-welcome-title');
    if (welcomeTitle) {
      welcomeTitle.textContent = `Welcome to SkillMatch, ${cand.name || 'Candidate'}!`;
    }

    // 1B. Check Interview Requests for candidate (Task 4)
    const interviewsSection = document.getElementById('dash-interviews-section');
    const interviewsContent = document.getElementById('dash-interviews-content');
    if (interviewsSection && interviewsContent) {
      const myApps = (state.applications || []).filter(a => 
        (a.candidateId === cand.id || (a.candidateEmail && cand.email && a.candidateEmail.toLowerCase() === cand.email.toLowerCase())) &&
        (a.status === 'INTERVIEW_REQUESTED' || a.interviewRequest)
      );

      if (myApps.length > 0) {
        interviewsSection.classList.remove('hidden');
        interviewsContent.innerHTML = myApps.map(app => {
          const req = app.interviewRequest || { type: 'Technical Interview', date: 'Upcoming', time: 'TBD', message: 'Interview requested by recruiter.' };
          return `
            <div class="p-4 rounded-xl bg-slate-950/80 border border-blue-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-white text-base">${app.jobTitle}</span>
                  <span class="text-blue-300 font-medium text-xs">• ${app.company}</span>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/40 font-semibold">${req.type || 'Interview'}</span>
                </div>
                <div class="flex items-center gap-4 text-xs text-blue-200 mt-1.5 font-mono">
                  <span>📅 <strong>Date:</strong> ${req.date}</span>
                  <span>⏰ <strong>Time:</strong> ${req.time}</span>
                </div>
                ${req.message ? `
                  <p class="text-xs text-slate-300 mt-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong class="text-blue-400">Recruiter Instructions:</strong> "${req.message}"
                  </p>
                ` : ''}
              </div>
              <button onclick="app.showToast('Connecting to SkillMatch Interview Room (Prototype)...', 'info')" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition shrink-0">
                Join Interview Room →
              </button>
            </div>
          `;
        }).join('');
      } else {
        interviewsSection.classList.add('hidden');
      }
    }

    // 2. Assessment Status Card
    const statusBadge = document.getElementById('dash-assess-status-badge');
    const statusScore = document.getElementById('dash-assess-status-score');
    const statusDate = document.getElementById('dash-assess-status-date');
    const statusViewBtn = document.getElementById('dash-assess-view-results-btn');

    if (hasAssessment && latest) {
      if (statusBadge) {
        statusBadge.textContent = '✓ Completed';
        statusBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200';
      }
      if (statusScore) {
        statusScore.textContent = `${latest.score} / ${latest.totalQuestions} (${latest.percentage}%)`;
      }
      if (statusDate) {
        statusDate.textContent = `Completed on ${latest.submittedAt}`;
      }
      if (statusViewBtn) {
        statusViewBtn.classList.remove('hidden');
      }
    } else {
      if (statusBadge) {
        statusBadge.textContent = '⏳ Assessment Not Completed';
        statusBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200';
      }
      if (statusScore) {
        statusScore.textContent = 'Pending Evaluation';
      }
      if (statusDate) {
        statusDate.textContent = 'Complete your assessment to understand your current skills and job readiness.';
      }
      if (statusViewBtn) {
        statusViewBtn.classList.add('hidden');
      }
    }

    // 3. Available Assessment Card
    const startAssessBtn = document.getElementById('dash-start-assess-btn');
    if (startAssessBtn) {
      if (hasAssessment) {
        startAssessBtn.innerHTML = '<span>↺ Retake Assessment</span>';
        startAssessBtn.onclick = () => this.retakeAssessment();
      } else {
        startAssessBtn.innerHTML = '<span>Start Assessment →</span>';
        startAssessBtn.onclick = () => this.startAssessmentInstructions();
      }
    }

    // 4. Previous Results Card
    const prevResultsCard = document.getElementById('dash-prev-results-content');
    if (prevResultsCard) {
      if (hasAssessment && latest) {
        let catSummaryHtml = '';
        if (latest.categories) {
          catSummaryHtml = Object.keys(latest.categories).map(catName => {
            const cat = latest.categories[catName];
            return `
              <div class="p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span class="text-slate-500 font-medium">${catName}:</span>
                <span class="font-bold text-slate-800 ml-1">${cat.correct}/${cat.total} (${cat.percentage}%)</span>
              </div>
            `;
          }).join('');
        }

        prevResultsCard.innerHTML = `
          <div class="space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span class="text-xs text-slate-500 font-medium">Technical Score:</span>
                <span class="text-lg font-extrabold text-blue-700 ml-1">${latest.score} / ${latest.totalQuestions}</span>
                <span class="text-xs font-semibold text-slate-600">(${latest.percentage}%)</span>
              </div>
              <span class="text-xs font-mono text-slate-500">${latest.submittedAt}</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              ${catSummaryHtml}
            </div>
            <div class="pt-2 flex justify-end">
              <button onclick="app.setCandidateTab('results')" class="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                View Full Question Breakdown & Explanations →
              </button>
            </div>
          </div>
        `;
      } else {
        prevResultsCard.innerHTML = `
          <div class="text-center py-6 text-slate-500 text-xs">
            <span class="text-2xl mb-1 block">📝</span>
            <p class="font-semibold text-slate-700">No Previous Assessment Found</p>
            <p class="text-slate-500 mt-1 max-w-sm mx-auto">Your verified technical score and category performance will be saved here once you complete your first assessment.</p>
            <button onclick="app.startAssessmentInstructions()" class="mt-3 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition">
              Take Skill Assessment Now →
            </button>
          </div>
        `;
      }
    }

    // 5. Skill Overview Grid
    const skillsGrid = document.getElementById('dash-skills-overview-grid');
    if (skillsGrid) {
      const defaultCategories = [
        'Programming Fundamentals',
        'Python Basics',
        'SQL Fundamentals',
        'Problem Solving',
        'Web Development Basics'
      ];

      const categoryMetadata = {
        'Programming Fundamentals': { icon: '💻', border: 'border-violet-200/90', bg: 'bg-gradient-to-br from-violet-50 to-indigo-50/50', text: 'text-violet-950', badgeDefault: 'bg-violet-100 text-violet-700' },
        'Python Basics': { icon: '🐍', border: 'border-emerald-200/90', bg: 'bg-gradient-to-br from-emerald-50 to-teal-50/50', text: 'text-emerald-950', badgeDefault: 'bg-emerald-100 text-emerald-700' },
        'SQL Fundamentals': { icon: '🗄️', border: 'border-amber-200/90', bg: 'bg-gradient-to-br from-amber-50 to-orange-50/50', text: 'text-amber-950', badgeDefault: 'bg-amber-100 text-amber-700' },
        'Problem Solving': { icon: '🧩', border: 'border-rose-200/90', bg: 'bg-gradient-to-br from-rose-50 to-pink-50/50', text: 'text-rose-950', badgeDefault: 'bg-rose-100 text-rose-700' },
        'Web Development Basics': { icon: '🌐', border: 'border-cyan-200/90', bg: 'bg-gradient-to-br from-cyan-50 to-sky-50/50', text: 'text-cyan-950', badgeDefault: 'bg-cyan-100 text-cyan-700' }
      };

      skillsGrid.innerHTML = defaultCategories.map(catName => {
        const meta = categoryMetadata[catName] || { icon: '✨', border: 'border-slate-200', bg: 'bg-white', text: 'text-slate-800', badgeDefault: 'bg-slate-100 text-slate-600' };
        let level = 'Unverified';
        let badgeClass = meta.badgeDefault + ' border-transparent';

        if (hasAssessment && latest && latest.categories && latest.categories[catName]) {
          const cat = latest.categories[catName];
          if (cat.percentage >= 80) {
            level = 'Advanced (80%+)';
            badgeClass = 'bg-emerald-600 text-white font-bold shadow-xs';
          } else if (cat.percentage >= 50) {
            level = 'Intermediate';
            badgeClass = 'bg-violet-600 text-white font-bold shadow-xs';
          } else {
            level = 'Developing';
            badgeClass = 'bg-amber-500 text-white font-bold shadow-xs';
          }
        }

        return `
          <div class="p-4 rounded-2xl border ${meta.border} ${meta.bg} flex items-center justify-between shadow-xs transition hover:shadow-md">
            <div class="flex items-center gap-2.5">
              <span class="text-base">${meta.icon}</span>
              <span class="text-xs font-bold ${meta.text}">${catName}</span>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${badgeClass}">${level}</span>
          </div>
        `;
      }).join('');
    }

    // Applications counts
    const apps = state.applications || [];
    const myCandidateApps = apps.filter(a => a.candidateId === cand.id || (a.candidateEmail && cand.email && a.candidateEmail.toLowerCase() === cand.email.toLowerCase()));
    const acceptedCount = myCandidateApps.filter(a => a.status === 'SELECTED' || a.status === 'Accepted').length;
    const pendingCount = myCandidateApps.filter(a => a.status === 'APPLIED' || a.status === 'UNDER_REVIEW' || a.status === 'INTERVIEW_REQUESTED' || a.status === 'Pending').length;
    const rejectedCount = myCandidateApps.filter(a => a.status === 'REJECTED' || a.status === 'Rejected').length;

    const appsTotalEl = document.getElementById('dash-apps-total');
    if (appsTotalEl) appsTotalEl.textContent = myCandidateApps.length;
    const appsAccEl = document.getElementById('dash-apps-accepted');
    if (appsAccEl) appsAccEl.textContent = acceptedCount;
    const appsPendEl = document.getElementById('dash-apps-pending');
    if (appsPendEl) appsPendEl.textContent = pendingCount;
    const appsRejEl = document.getElementById('dash-apps-rejected');
    if (appsRejEl) appsRejEl.textContent = rejectedCount;

    // Recent recommendations snippet
    const quickJobsContainer = document.getElementById('dash-quick-jobs');
    if (quickJobsContainer) {
      quickJobsContainer.innerHTML = '';
      (state.jobs || []).slice(0, 3).forEach(job => {
        const eligibility = window.FairHireScoring.calculateJobEligibility(cand, job);
        const hasApplied = myCandidateApps.some(a => a.jobId === job.id || a.jobTitle === job.title);

        let actionBtnHtml = '';
        if (hasApplied) {
          actionBtnHtml = `<button class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default" disabled>✓ Applied</button>`;
        } else if (eligibility.canApply) {
          actionBtnHtml = `<button class="btn-jewel-primary px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer" onclick="app.openApplyModal('${job.id}')">${eligibility.actionText}</button>`;
        } else {
          actionBtnHtml = `<button class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-400 cursor-not-allowed" onclick="app.setCandidateTab('skillgap')">Improve Skills</button>`;
        }

        const card = document.createElement('div');
        card.className = 'light-card p-4 rounded-xl flex items-center justify-between border border-slate-200';
        card.innerHTML = `
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-900 text-sm">${job.company}</span>
              <span class="text-xs px-2 py-0.5 rounded-full ${eligibility.badgeClass}">${eligibility.statusBadge}</span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${job.title} • Min Score: ${job.minScore}/50</p>
          </div>
          ${actionBtnHtml}
        `;
        quickJobsContainer.appendChild(card);
      });
    }
  }

  // ==========================================
  // 3. CANDIDATE PROFILE
  // ==========================================
  renderCandidateProfileForm() {
    const cand = window.appStore.getState().candidate;

    // Academic
    document.getElementById('prof-tenth').value = cand.academic.tenthPercent;
    document.getElementById('prof-twelfth').value = cand.academic.twelfthPercent;
    document.getElementById('prof-cgpa').value = cand.academic.cgpa;

    // Skills Render
    this.renderSkillsList();

    // Certifications Render
    this.renderCertificationsList();

    // Project Info
    if (cand.projects && cand.projects.length > 0) {
      const p = cand.projects[0];
      document.getElementById('prof-proj-title').value = p.title || '';
      document.getElementById('prof-proj-desc').value = p.description || '';
      document.getElementById('prof-proj-tech').value = (p.technologies || []).join(', ');
      document.getElementById('prof-proj-url').value = p.githubUrl || '';
    }

    // Internship Info
    if (cand.experience) {
      document.getElementById('prof-exp-role').value = cand.experience.role || '';
      document.getElementById('prof-exp-company').value = cand.experience.company || '';
      document.getElementById('prof-exp-duration').value = cand.experience.duration || '';
      document.getElementById('prof-exp-desc').value = cand.experience.description || '';
    }
  }

  renderSkillsList() {
    const cand = window.appStore.getState().candidate;
    const container = document.getElementById('profile-skills-tags');
    if (!container) return;

    container.innerHTML = '';
    (cand.skills || []).forEach((sk, idx) => {
      const badge = document.createElement('div');
      let levelColor = 'bg-indigo-50 text-indigo-800 border-indigo-200';
      if (sk.level === 'Advanced') levelColor = 'bg-purple-50 text-purple-800 border-purple-200';
      if (sk.level === 'Beginner') levelColor = 'bg-slate-100 text-slate-700 border-slate-200';

      badge.className = `inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border ${levelColor} shadow-xs`;
      badge.innerHTML = `
        <span><strong>${sk.name}</strong> (${sk.level})</span>
        <button type="button" class="text-slate-400 hover:text-rose-500 ml-1 font-bold" onclick="app.removeSkill(${idx})">
          ✕
        </button>
      `;
      container.appendChild(badge);
    });
  }

  addSkillFromInput() {
    const nameInput = document.getElementById('new-skill-name');
    const levelSelect = document.getElementById('new-skill-level');
    const name = nameInput.value.trim();
    const level = levelSelect.value;

    if (!name) {
      this.showToast('Please enter a skill name', 'warning');
      return;
    }

    window.appStore.update(s => {
      // Avoid duplicate
      const exists = s.candidate.skills.find(sk => sk.name.toLowerCase() === name.toLowerCase());
      if (exists) {
        exists.level = level;
      } else {
        s.candidate.skills.push({ name, level });
      }
    });

    nameInput.value = '';
    this.renderSkillsList();
    this.showToast(`Skill "${name}" (${level}) added. Remember to click Save Profile.`, 'info');
  }

  removeSkill(index) {
    window.appStore.update(s => {
      s.candidate.skills.splice(index, 1);
    });
    this.renderSkillsList();
  }

  renderCertificationsList() {
    const cand = window.appStore.getState().candidate;
    const container = document.getElementById('profile-certs-container');
    if (!container) return;

    container.innerHTML = '';
    (cand.certifications || []).forEach((c, idx) => {
      const item = document.createElement('div');
      item.className = 'flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-violet-200 transition text-xs shadow-xs';
      item.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="font-bold text-slate-900">${c.title}</span>
          <span class="text-violet-700 bg-violet-50 px-2 py-0.5 rounded-lg border border-violet-100 font-mono text-[11px] font-semibold">${c.issuer}, ${c.year}</span>
        </div>
        <button type="button" class="text-rose-500 hover:text-rose-700 font-bold px-2 py-1 rounded-lg hover:bg-rose-50 transition" onclick="app.removeCert(${idx})">Remove</button>
      `;
      container.appendChild(item);
    });
  }

  addCertificationFromInput() {
    const titleInput = document.getElementById('new-cert-title');
    const issuerInput = document.getElementById('new-cert-issuer');
    const title = titleInput.value.trim();
    const issuer = issuerInput.value.trim() || 'Accredited Source';

    if (!title) {
      this.showToast('Please enter certification title', 'warning');
      return;
    }

    window.appStore.update(s => {
      s.candidate.certifications.push({
        id: 'c-' + Date.now(),
        title,
        issuer,
        year: new Date().getFullYear().toString()
      });
    });

    titleInput.value = '';
    issuerInput.value = '';
    this.renderCertificationsList();
    this.showToast(`Certification "${title}" added.`, 'info');
  }

  removeCert(index) {
    window.appStore.update(s => {
      s.candidate.certifications.splice(index, 1);
    });
    this.renderCertificationsList();
  }

  saveCandidateProfile() {
    const tenth = parseFloat(document.getElementById('prof-tenth').value) || 79;
    const twelfth = parseFloat(document.getElementById('prof-twelfth').value) || 72;
    const cgpa = parseFloat(document.getElementById('prof-cgpa').value) || 8.5;

    const projTitle = document.getElementById('prof-proj-title').value.trim();
    const projDesc = document.getElementById('prof-proj-desc').value.trim();
    const projTech = document.getElementById('prof-proj-tech').value.split(',').map(t => t.trim()).filter(Boolean);
    const projUrl = document.getElementById('prof-proj-url').value.trim();

    const expRole = document.getElementById('prof-exp-role').value.trim();
    const expComp = document.getElementById('prof-exp-company').value.trim();
    const expDur = document.getElementById('prof-exp-duration').value.trim();
    const expDesc = document.getElementById('prof-exp-desc').value.trim();

    window.appStore.update(s => {
      s.candidate.academic.tenthPercent = tenth;
      s.candidate.academic.twelfthPercent = twelfth;
      s.candidate.academic.cgpa = cgpa;

      if (s.candidate.projects.length === 0) {
        s.candidate.projects.push({});
      }
      s.candidate.projects[0].title = projTitle;
      s.candidate.projects[0].description = projDesc;
      s.candidate.projects[0].technologies = projTech;
      s.candidate.projects[0].githubUrl = projUrl;

      s.candidate.experience = {
        hasInternship: true,
        role: expRole,
        company: expComp,
        duration: expDur,
        description: expDesc
      };

      // Recalculate score live with transparent rules!
      const scoreResult = window.FairHireScoring.calculateFairHireScore(s.candidate);
      s.candidate.score = scoreResult;

      // Update applications for this candidate in single-source state.applications
      if (Array.isArray(s.applications)) {
        s.applications.forEach(a => {
          if (a.candidateId === s.candidate.id || (a.candidateEmail && s.candidate.email && a.candidateEmail.toLowerCase() === s.candidate.email.toLowerCase())) {
            a.score = scoreResult.total;
            if (!a.candidateProfile) a.candidateProfile = {};
            a.candidateProfile.tenth = tenth;
            a.candidateProfile.twelfth = twelfth;
            a.candidateProfile.cgpa = cgpa;
            a.candidateProfile.academicScore = `${scoreResult.academic} / ${scoreResult.academicMax}`;
            a.candidateProfile.technicalScore = `${scoreResult.technical} / ${scoreResult.technicalMax}`;
            a.candidateProfile.certificationsScore = `${scoreResult.certifications} / ${scoreResult.certificationsMax}`;
            a.candidateProfile.projectsScore = `${scoreResult.projects} / ${scoreResult.projectsMax}`;
          }
        });
      }

      // Also update HR record for candidate if exists
      if (Array.isArray(s.hrApplicants)) {
        const hrCand = s.hrApplicants.find(h => h.id === s.candidate.id);
        if (hrCand) {
          hrCand.score = scoreResult.total;
          hrCand.academicScore = `${scoreResult.academic} / ${scoreResult.academicMax}`;
          hrCand.technicalScore = `${scoreResult.technical} / ${scoreResult.technicalMax}`;
          hrCand.certificationsScore = `${scoreResult.certifications} / ${scoreResult.certificationsMax}`;
          hrCand.projectsScore = `${scoreResult.projects} / ${scoreResult.projectsMax}`;
          hrCand.skills = s.candidate.skills.map(sk => sk.name);
        }
      }
    });

    this.showToast('Profile updated & SkillMatch Score recalculated successfully!', 'success');
    this.renderCandidatePortal();
  }

  // ==========================================
  // 4. FAIRHIRE SCORE
  // ==========================================
  renderScoreBreakdownPage() {
    const cand = window.appStore.getState().candidate;
    const score = cand.score;

    document.getElementById('score-total-display').textContent = score.total;
    document.getElementById('score-academic-val').textContent = `${score.academic} / ${score.academicMax}`;
    document.getElementById('score-technical-val').textContent = `${score.technical} / ${score.technicalMax}`;
    document.getElementById('score-certs-val').textContent = `${score.certifications} / ${score.certificationsMax}`;
    document.getElementById('score-projects-val').textContent = `${score.projects} / ${score.projectsMax}`;

    // Update Circular SVG gauge
    const circle = document.getElementById('score-gauge-bar');
    if (circle) {
      const radius = 58;
      const circumference = 2 * Math.PI * radius;
      const percent = score.total / score.max;
      const offset = circumference - (percent * circumference);
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = offset;
    }

    // Set explanation contents
    const explanations = score.breakdownExplanations || {
      academic: "Your academic score is based on your 10th, 12th and semester performance.",
      technical: "Your technical score considers the number and proficiency of relevant skills entered in your profile.",
      certifications: "Relevant certifications contribute to the score. Certificate quantity alone does not determine the score.",
      projects: "Projects contribute based on relevance and practical technologies demonstrated."
    };

    document.getElementById('why-academic-text').innerHTML = explanations.academic;
    document.getElementById('why-technical-text').innerHTML = explanations.technical;
    document.getElementById('why-certs-text').innerHTML = explanations.certifications;
    document.getElementById('why-projects-text').innerHTML = explanations.projects;

    // Dynamically update Why button labels
    const whyAcadBtn = document.getElementById('why-academic-btn-text');
    if (whyAcadBtn) whyAcadBtn.textContent = `Why ${score.academic}/${score.academicMax}?`;

    const whyTechBtn = document.getElementById('why-technical-btn-text');
    if (whyTechBtn) whyTechBtn.textContent = `Why ${score.technical}/${score.technicalMax}?`;

    const whyCertsBtn = document.getElementById('why-certs-btn-text');
    if (whyCertsBtn) whyCertsBtn.textContent = `Why ${score.certifications}/${score.certificationsMax}?`;

    const whyProjBtn = document.getElementById('why-projects-btn-text');
    if (whyProjBtn) whyProjBtn.textContent = `Why ${score.projects}/${score.projectsMax}?`;
  }

  toggleWhyExplanation(cardId) {
    const el = document.getElementById(cardId);
    if (el) {
      el.classList.toggle('hidden');
    }
  }

  // ==========================================
  // 5. SKILL ASSESSMENT WORKFLOW (TASK 1)
  // 15 Random Questions from 32 Pool, Stable Session
  // ==========================================
  getOrCreateAssessmentSession(candidate) {
    if (candidate && candidate.activeAssessment && Array.isArray(candidate.activeAssessment.questions) && candidate.activeAssessment.questions.length === 15) {
      this.currentAssessmentQuestions = candidate.activeAssessment.questions;
      this.userAnswers = candidate.activeAssessment.userAnswers || {};
      this.currentQuestionIndex = candidate.activeAssessment.currentIndex || 0;
      return this.currentAssessmentQuestions;
    }

    // Generate a fresh random 15-question assessment session from 32 questions
    this.currentAssessmentQuestions = generateAssessmentSession(ASSESSMENT_QUESTIONS, 15);
    this.userAnswers = {};
    this.currentQuestionIndex = 0;

    if (candidate && candidate.email) {
      window.appStore.saveActiveAssessmentSession(candidate.email, {
        questions: this.currentAssessmentQuestions,
        userAnswers: this.userAnswers,
        currentIndex: this.currentQuestionIndex
      });
    }
    return this.currentAssessmentQuestions;
  }

  saveActiveAssessmentState() {
    const state = window.appStore.getState();
    const cand = state.candidate || window.appStore.getCandidateProfile(state.candidateAuth.email);
    if (cand && cand.email && this.currentAssessmentQuestions) {
      window.appStore.saveActiveAssessmentSession(cand.email, {
        questions: this.currentAssessmentQuestions,
        userAnswers: this.userAnswers,
        currentIndex: this.currentQuestionIndex
      });
    }
  }

  startAssessmentInstructions() {
    this.setCandidateTab('instructions');
  }

  renderAssessmentInstructions() {
    const totalQEl = document.getElementById('instructions-total-questions');
    if (totalQEl) totalQEl.textContent = '15 Questions';
  }

  startAssessmentQuiz() {
    const state = window.appStore.getState();
    const cand = state.candidate || window.appStore.getCandidateProfile(state.candidateAuth.email);
    this.getOrCreateAssessmentSession(cand);
    this.setCandidateTab('assessments');
  }

  renderAssessmentQuiz() {
    const state = window.appStore.getState();
    const cand = state.candidate || window.appStore.getCandidateProfile(state.candidateAuth.email);
    if (!this.currentAssessmentQuestions || this.currentAssessmentQuestions.length !== 15) {
      this.getOrCreateAssessmentSession(cand);
    }
    if (this.currentQuestionIndex >= this.currentAssessmentQuestions.length) {
      this.currentQuestionIndex = 0;
    }
    this.renderCurrentQuestion();
  }

  renderCurrentQuestion() {
    if (!this.currentAssessmentQuestions || this.currentAssessmentQuestions.length === 0) {
      const state = window.appStore.getState();
      const cand = state.candidate || window.appStore.getCandidateProfile(state.candidateAuth.email);
      this.getOrCreateAssessmentSession(cand);
    }
    const questions = this.currentAssessmentQuestions;
    const totalQ = questions.length;
    const q = questions[this.currentQuestionIndex];
    if (!q) return;

    // Header updates
    const numEl = document.getElementById('quiz-q-num');
    const catEl = document.getElementById('quiz-q-category');
    const diffEl = document.getElementById('quiz-q-difficulty');
    const textEl = document.getElementById('quiz-q-text');
    const answeredCountEl = document.getElementById('quiz-answered-count');

    if (numEl) numEl.textContent = `Question ${this.currentQuestionIndex + 1} of ${totalQ}`;
    if (catEl) catEl.textContent = q.category;
    if (diffEl) {
      diffEl.textContent = q.difficulty || 'Intermediate';
      diffEl.className = `text-[11px] px-2 py-0.5 rounded-full font-semibold border ${
        q.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
        q.difficulty === 'Medium' ? 'bg-blue-50 text-blue-700 border-blue-200' :
        'bg-purple-50 text-purple-700 border-purple-200'
      }`;
    }
    if (textEl) textEl.textContent = q.question;

    const answeredCount = Object.keys(this.userAnswers).length;
    if (answeredCountEl) {
      answeredCountEl.textContent = `${answeredCount} of ${totalQ} Answered`;
    }

    // Render 4 Options (Shuffled for attempt while mapping is preserved)
    const optionsContainer = document.getElementById('quiz-options-container');
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];
      q.options.forEach((opt, idx) => {
        const isSelected = this.userAnswers[this.currentQuestionIndex] === idx;
        const optCard = document.createElement('div');
        optCard.className = `quiz-option-card p-4 sm:p-5 rounded-2xl flex items-center gap-4 ${isSelected ? 'selected' : ''}`;
        optCard.onclick = () => this.selectQuizOption(this.currentQuestionIndex, idx);

        optCard.innerHTML = `
          <div class="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-all ${
            isSelected ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/30 scale-105' : 'bg-slate-100 text-slate-700 border border-slate-200'
          }">
            ${letters[idx]}
          </div>
          <div class="text-xs sm:text-sm ${isSelected ? 'font-bold text-violet-950' : 'text-slate-800 font-medium'} leading-relaxed">
            ${opt}
          </div>
        `;
        optionsContainer.appendChild(optCard);
      });
    }

    // Render Question Palette (1 to 15)
    const paletteContainer = document.getElementById('quiz-palette-container');
    if (paletteContainer) {
      paletteContainer.innerHTML = '';
      for (let i = 0; i < totalQ; i++) {
        const btn = document.createElement('button');
        const isCurrent = (i === this.currentQuestionIndex);
        const isAnswered = (this.userAnswers[i] !== undefined && this.userAnswers[i] !== null);

        let cls = 'palette-btn ';
        if (isCurrent) cls += 'current ';
        if (isAnswered) cls += 'answered ';
        else cls += 'unanswered ';

        btn.className = cls;
        btn.textContent = i + 1;
        btn.title = `Jump to Question ${i + 1} (${isAnswered ? 'Answered' : 'Unanswered'})`;
        btn.onclick = () => this.jumpToQuestion(i);
        paletteContainer.appendChild(btn);
      }
    }

    // Navigation Controls
    const prevBtn = document.getElementById('quiz-prev-btn');
    if (prevBtn) {
      prevBtn.disabled = (this.currentQuestionIndex === 0);
    }

    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) {
      if (this.currentQuestionIndex === totalQ - 1) {
        nextBtn.classList.add('hidden');
      } else {
        nextBtn.classList.remove('hidden');
      }
    }

    const submitBtn = document.getElementById('quiz-submit-btn');
    if (submitBtn) {
      submitBtn.classList.remove('hidden');
    }
  }

  selectQuizOption(questionIndex, optionIndex) {
    this.userAnswers[questionIndex] = optionIndex;
    this.saveActiveAssessmentState();
    this.renderCurrentQuestion();
  }

  // Alias for backward compatibility
  selectOption(optionIndex) {
    this.selectQuizOption(this.currentQuestionIndex, optionIndex);
  }

  jumpToQuestion(index) {
    if (this.currentAssessmentQuestions && index >= 0 && index < this.currentAssessmentQuestions.length) {
      this.currentQuestionIndex = index;
      this.saveActiveAssessmentState();
      this.renderCurrentQuestion();
    }
  }

  nextQuestion() {
    if (this.currentAssessmentQuestions && this.currentQuestionIndex < this.currentAssessmentQuestions.length - 1) {
      this.currentQuestionIndex++;
      this.saveActiveAssessmentState();
      this.renderCurrentQuestion();
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.saveActiveAssessmentState();
      this.renderCurrentQuestion();
    }
  }

  confirmSubmitAssessment() {
    const answeredCount = Object.keys(this.userAnswers).length;
    const totalQ = this.currentAssessmentQuestions ? this.currentAssessmentQuestions.length : 15;
    const confirmCountEl = document.getElementById('confirm-answered-count');
    const confirmUnansweredNotice = document.getElementById('confirm-unanswered-notice');

    if (confirmCountEl) {
      confirmCountEl.textContent = `${answeredCount} of ${totalQ}`;
    }
    if (confirmUnansweredNotice) {
      if (answeredCount < totalQ) {
        confirmUnansweredNotice.textContent = `Note: ${totalQ - answeredCount} unanswered question(s) will be evaluated as incorrect.`;
        confirmUnansweredNotice.className = 'p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800';
        confirmUnansweredNotice.classList.remove('hidden');
      } else {
        confirmUnansweredNotice.textContent = 'All 15 questions have been answered. Ready for dynamic scoring!';
        confirmUnansweredNotice.className = 'p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800';
        confirmUnansweredNotice.classList.remove('hidden');
      }
    }

    this.openModal('assessment-confirm-modal');
  }

  submitAssessment() {
    this.closeModal('assessment-confirm-modal');
    const state = window.appStore.getState();
    const cand = state.candidate || window.appStore.getCandidateProfile(state.candidateAuth.email);
    const candEmail = cand.email || state.candidateAuth.email || 'candidate@college.edu';

    const assessmentQuestions = this.currentAssessmentQuestions || ASSESSMENT_QUESTIONS.slice(0, 15);

    // Dynamic Grading: Strict Score = (Correct Answers / 15) * 100
    const result = window.FairHireScoring.calculateAssessmentScore(this.userAnswers, assessmentQuestions);

    // Clear active attempt session
    window.appStore.clearActiveAssessmentSession(candEmail);

    // Persist in candidate record & localStorage
    window.appStore.saveCandidateAssessment(candEmail, result);

    // Update candidateAuth & applications state
    window.appStore.update(s => {
      s.candidate.assessmentStatus = 'Completed';
      s.candidate.latestAssessment = result;

      // Update existing applications with new general assessment score
      (s.applications || []).forEach(app => {
        if (app.candidateId === cand.id || (app.candidateEmail && cand.email && app.candidateEmail.toLowerCase() === cand.email.toLowerCase())) {
          app.generalScore = result.score;
          app.generalPercentage = result.percentage;
        }
      });

      // Update hrApplicants for backwards compatibility
      const candApp = (s.hrApplicants || []).find(a => a.id === cand.id);
      if (candApp) {
        candApp.assessmentStatus = 'Completed';
        candApp.evaluationStatus = 'Available';
        candApp.assessmentRating = `${(result.percentage / 10).toFixed(1)} / 10`;
        candApp.score = s.candidate.score ? s.candidate.score.total : 42;
      }

      if (s.hrNotifications) {
        s.hrNotifications.unshift({
          id: 'notif-' + Date.now(),
          time: 'Just now',
          title: 'Assessment Completed',
          message: `Candidate ${cand.name || cand.id} completed General Assessment (${result.score}/15 - ${result.percentage}%).`,
          type: 'success'
        });
      }
    });

    this.showToast(`Assessment submitted! Score: ${result.score} / ${result.totalQuestions} (${result.percentage}%)`, 'success');
    this.setCandidateTab('results');
    this.renderAssessmentResults(result);
  }

  renderAssessmentResults(resultData) {
    const state = window.appStore.getState();
    const cand = state.candidate || window.appStore.getCandidateProfile(state.candidateAuth.email);
    const result = resultData || cand.latestAssessment;

    if (!result) {
      this.setCandidateTab('dashboard');
      return;
    }

    // Main Score Card: Strictly X / 15 (Y%)
    const scoreValEl = document.getElementById('result-score-val');
    const percentValEl = document.getElementById('result-percent-val');
    const dateValEl = document.getElementById('result-date-val');

    if (scoreValEl) scoreValEl.textContent = `${result.score} / ${result.totalQuestions}`;
    if (percentValEl) percentValEl.textContent = `${result.percentage}%`;
    if (dateValEl) dateValEl.textContent = `Completed: ${result.submittedAt}`;

    // Stat cards
    const totalQEl = document.getElementById('result-total-q');
    const correctEl = document.getElementById('result-correct-count');
    const incorrectEl = document.getElementById('result-incorrect-count');
    const unansweredEl = document.getElementById('result-unanswered-count');

    if (totalQEl) totalQEl.textContent = result.totalQuestions;
    if (correctEl) correctEl.textContent = result.correctAnswers;
    if (incorrectEl) incorrectEl.textContent = result.incorrectAnswers;
    if (unansweredEl) unansweredEl.textContent = result.unanswered;

    // Category Performance
    const catContainer = document.getElementById('result-categories-container');
    if (catContainer && result.categories) {
      catContainer.innerHTML = Object.keys(result.categories).map(catName => {
        const cat = result.categories[catName];
        let barColor = 'bg-gradient-to-r from-violet-600 to-indigo-600';
        let badgeColor = 'cand-tag-violet';
        let level = 'Intermediate';

        if (cat.percentage >= 80) {
          barColor = 'bg-gradient-to-r from-emerald-500 to-teal-500';
          badgeColor = 'cand-tag-emerald';
          level = 'Advanced';
        } else if (cat.percentage < 50) {
          barColor = 'bg-gradient-to-r from-amber-500 to-orange-500';
          badgeColor = 'cand-tag-amber';
          level = 'Beginner';
        }

        return `
          <div class="cand-glass-card p-4 rounded-2xl border border-slate-200/80 space-y-2.5 bg-white shadow-xs">
            <div class="flex items-center justify-between">
              <span class="font-bold text-slate-800 text-xs sm:text-sm">${catName}</span>
              <span class="text-[11px] px-2.5 py-0.5 rounded-full font-bold ${badgeColor}">${level}</span>
            </div>
            <div class="flex items-center justify-between text-xs text-slate-500">
              <span>Score: <strong class="text-slate-800">${cat.correct} / ${cat.total}</strong></span>
              <span class="font-bold text-violet-700">${cat.percentage}%</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div class="${barColor} h-2 rounded-full transition-all duration-700" style="width: ${cat.percentage}%"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    // Detailed Question Review: Uses the exact question snapshot of the attempt
    const reviewContainer = document.getElementById('result-review-container');
    if (reviewContainer) {
      const letters = ['A', 'B', 'C', 'D'];
      const questionsToReview = result.questions || this.currentAssessmentQuestions || ASSESSMENT_QUESTIONS.slice(0, 15);
      reviewContainer.innerHTML = questionsToReview.map((q, idx) => {
        const userAns = (result.userAnswers && result.userAnswers[idx] !== undefined) ? result.userAnswers[idx] : null;
        const isCorrect = (userAns === q.correctAnswer);
        const isUnanswered = (userAns === null || userAns === undefined);

        let statusBadge = `
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            ✓ Correct
          </span>
        `;
        let userAnsClass = 'border-emerald-300 bg-emerald-50 text-emerald-900';

        if (isUnanswered) {
          statusBadge = `
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
              ⚠️ Unanswered
            </span>
          `;
          userAnsClass = 'border-slate-200 bg-slate-50 text-slate-600';
        } else if (!isCorrect) {
          statusBadge = `
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
              ✕ Incorrect
            </span>
          `;
          userAnsClass = 'border-rose-300 bg-rose-50 text-rose-900';
        }

        const userOptText = !isUnanswered && q.options[userAns] ? `${letters[userAns]}. ${q.options[userAns]}` : 'None (Skipped)';
        const correctOptText = `${letters[q.correctAnswer]}. ${q.options[q.correctAnswer]}`;

        return `
          <div class="cand-glass-card p-5 sm:p-6 rounded-3xl border border-indigo-100/80 space-y-3.5 bg-white shadow-xs">
            <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div class="flex items-center gap-2">
                <span class="font-bold text-xs text-violet-700 font-mono bg-violet-50 px-2.5 py-1 rounded-lg border border-violet-100">Q${idx + 1}</span>
                <span class="text-slate-400 text-xs">•</span>
                <span class="text-xs font-bold text-slate-700">${q.category}</span>
              </div>
              ${statusBadge}
            </div>

            <p class="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">${q.question}</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3.5 rounded-2xl border ${userAnsClass} font-medium">
                <span class="block font-bold text-[11px] uppercase tracking-wider mb-1">Your Selection:</span>
                <span>${userOptText}</span>
              </div>
              <div class="p-3.5 rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-900 font-medium">
                <span class="block font-bold text-[11px] uppercase tracking-wider mb-1">Correct Answer:</span>
                <span>${correctOptText}</span>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-gradient-to-r from-violet-50/70 via-indigo-50/50 to-purple-50/40 border border-violet-100 text-xs text-slate-800 space-y-1">
              <span class="font-bold text-violet-950 text-[11px] uppercase tracking-wider block">💡 Technical Explanation:</span>
              <p class="leading-relaxed">${q.explanation}</p>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  retakeAssessment() {
    const state = window.appStore.getState();
    const cand = state.candidate || window.appStore.getCandidateProfile(state.candidateAuth.email);
    if (cand && cand.email) {
      window.appStore.clearActiveAssessmentSession(cand.email);
    }
    this.currentAssessmentQuestions = null;
    this.userAnswers = {};
    this.currentQuestionIndex = 0;
    this.startAssessmentQuiz();
  }

  // ==========================================
  // 6. AVAILABLE JOBS & ELIGIBILITY
  // ==========================================
  renderAvailableJobs() {
    const state = window.appStore.getState();
    const cand = state.candidate || window.appStore.getCandidateProfile(state.candidateAuth.email);
    const container = document.getElementById('available-jobs-grid');
    if (!container) return;

    container.innerHTML = '';
    const myApps = (state.applications || []).filter(a => 
      a.candidateId === cand.id || 
      (a.candidateEmail && cand.email && a.candidateEmail.toLowerCase() === cand.email.toLowerCase())
    );

    state.jobs.forEach(job => {
      const eligibility = window.FairHireScoring.calculateJobEligibility(cand, job);
      const matchScore = window.FairHireScoring.calculateJobMatch(cand, job);
      const hasApplied = myApps.some(a => a.jobId === job.id || a.jobTitle.toLowerCase() === job.title.toLowerCase());

      const card = document.createElement('div');
      card.className = 'cand-glass-card p-6 sm:p-7 rounded-3xl border border-indigo-100/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative bg-white';
      
      const skillsHtml = job.requiredSkills.map(sk => {
        const hasSkill = (cand.skills || []).some(s => (typeof s === 'string' ? s : s.name).toLowerCase() === sk.toLowerCase());
        return `<span class="text-xs px-2.5 py-1 rounded-xl ${hasSkill ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold' : 'bg-slate-100 text-slate-600 border border-slate-200'}">${hasSkill ? '✓ ' : ''}${sk}</span>`;
      }).join(' ');

      let missingHtml = '';
      if (eligibility.missingSkills.length > 0 && !eligibility.isEligible) {
        missingHtml = `
          <div class="mt-3 p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950">
            <p class="font-bold mb-1">Reason: ${eligibility.reason}</p>
            <p class="text-amber-800">Missing: ${eligibility.missingSkills.join(', ')}</p>
          </div>
        `;
      } else if (eligibility.status === 'POTENTIAL_MATCH') {
        missingHtml = `
          <div class="mt-3 p-3 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-xs text-indigo-950">
            <p class="font-medium">${eligibility.reason}</p>
          </div>
        `;
      }

      let actionBtnHtml = '';
      if (hasApplied) {
        actionBtnHtml = `
          <button class="px-4 py-2 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200 cursor-default" disabled>
            ✓ Already Applied
          </button>
        `;
      } else if (eligibility.canApply) {
        actionBtnHtml = `
          <button class="px-5 py-2.5 btn-jewel-primary text-white font-bold text-xs rounded-xl shadow-md transition"
                  onclick="app.openApplyModal('${job.id}')">
            Take Case Assessment & Apply →
          </button>
        `;
      } else {
        actionBtnHtml = `
          <button class="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs rounded-xl border border-amber-300 shadow-xs transition"
                  onclick="app.setCandidateTab('skillgap')">
            Improve Skills
          </button>
        `;
      }

      let statusBadgeHtml = '';
      if (hasApplied) {
        statusBadgeHtml = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Applied</span>';
      } else if (eligibility.isEligible) {
        statusBadgeHtml = `<span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">${eligibility.statusBadge}</span>`;
      } else if (eligibility.status === 'POTENTIAL_MATCH') {
        statusBadgeHtml = `<span class="px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200">${eligibility.statusBadge}</span>`;
      } else {
        statusBadgeHtml = `<span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">${eligibility.statusBadge}</span>`;
      }

      card.innerHTML = `
        <div>
          <div class="flex items-start justify-between gap-2">
            <div>
              <span class="text-xs font-mono uppercase tracking-wider text-violet-600 font-bold">${job.company}</span>
              <h3 class="text-lg sm:text-xl font-black text-slate-900 mt-0.5 tracking-tight">${job.title}</h3>
              <p class="text-xs text-slate-500 mt-1 font-medium">${job.location} • ${job.experience} • <span class="text-emerald-700 font-semibold">${job.salary}</span></p>
            </div>
            ${statusBadgeHtml}
          </div>

          <p class="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">${job.description}</p>

          <div class="mt-4">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span>Required Minimum: <strong class="text-slate-800">${job.minScore}/50</strong></span>
              <span>Your Score: <strong class="text-violet-700 font-bold">${cand.score ? cand.score.total : 0}/50</strong></span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div class="h-2 rounded-full ${eligibility.isEligible ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-amber-400 to-orange-400'}" style="width: ${Math.min(100, (((cand.score ? cand.score.total : 0) / job.minScore) * 100))}%"></div>
            </div>
          </div>

          <div class="mt-4">
            <p class="text-xs text-slate-700 font-bold mb-1.5">Required Skills:</p>
            <div class="flex flex-wrap gap-1.5">
              ${skillsHtml}
            </div>
          </div>

          ${missingHtml}
        </div>

        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div class="text-xs">
            <span class="text-slate-500 font-medium">Skill Match:</span>
            <span class="font-extrabold text-emerald-700 ml-1 text-sm">${matchScore}%</span>
          </div>
          ${actionBtnHtml}
        </div>
      `;

      container.appendChild(card);
    });
  }

  // ==========================================
  // 7. APPLICATION & CASE ASSESSMENT WORKFLOW (TASK 2)
  // ==========================================
  openApplyModal(jobId) {
    const state = window.appStore.getState();
    const job = state.jobs.find(j => j.id === jobId);
    if (!job) return;

    const cand = state.candidate || 
      (state.candidateAuth && window.appStore && window.appStore.getCandidateProfile ? window.appStore.getCandidateProfile(state.candidateAuth.email) : null) || 
      { id: 'FH1001', name: 'Candidate', email: 'ragav.v@student.edu' };
    const candId = cand.id || 'FH1001';
    const candEmail = (cand.email || '').toLowerCase();

    // Duplicate check: Prevent duplicate applications
    const existing = (state.applications || []).find(a => 
      (a.jobId === jobId || (a.jobTitle && a.jobTitle.toLowerCase() === job.title.toLowerCase())) &&
      (a.candidateId === candId || (a.candidateEmail && candEmail && a.candidateEmail.toLowerCase() === candEmail))
    );

    if (existing) {
      this.showToast(`Already Applied: You have already submitted an application for ${job.title} at ${job.company}. Current status: ${existing.status}`, 'warning');
      return;
    }

    const template = getCaseTemplateForJob(job.id, job.title);
    this.activeCaseAssessment = {
      job,
      template,
      answers: {}
    };

    // Populate modal elements
    const roleBadge = document.getElementById('case-modal-role-badge');
    const compBadge = document.getElementById('case-modal-company-badge');
    const titleEl = document.getElementById('case-modal-title');
    const subTitleEl = document.getElementById('case-modal-subtitle');
    const scenarioTitle = document.getElementById('case-scenario-title');
    const scenarioText = document.getElementById('case-scenario-text');

    if (roleBadge) roleBadge.textContent = job.title;
    if (compBadge) compBadge.textContent = job.company;
    if (titleEl) titleEl.textContent = `${job.title} Case Assessment`;
    if (subTitleEl) subTitleEl.textContent = `Practical scenario evaluation for ${job.company} — ${template.questions.length} questions required.`;
    if (scenarioTitle) scenarioTitle.textContent = template.title;
    if (scenarioText) scenarioText.textContent = template.scenario;

    this.renderCaseQuestions();
    this.setCaseTab('case');
    this.openModal('case-assessment-modal');
  }

  openInterviewRoom(jobId) {
    const state = window.appStore.getState();
    const job = state.jobs.find(j => j.id === jobId) || state.jobs[0];
    const template = getCaseTemplateForJob(job.id, job.title);
    this.activeCaseAssessment = {
      job,
      template,
      answers: {}
    };

    const roleBadge = document.getElementById('case-modal-role-badge');
    const compBadge = document.getElementById('case-modal-company-badge');
    const titleEl = document.getElementById('case-modal-title');
    const subTitleEl = document.getElementById('case-modal-subtitle');
    const scenarioTitle = document.getElementById('case-scenario-title');
    const scenarioText = document.getElementById('case-scenario-text');

    if (roleBadge) roleBadge.textContent = job.title;
    if (compBadge) compBadge.textContent = job.company;
    if (titleEl) titleEl.textContent = `${job.title} Live Interview Room`;
    if (subTitleEl) subTitleEl.textContent = `Technical proctoring and interactive interview session for ${job.company}.`;
    if (scenarioTitle) scenarioTitle.textContent = template.title;
    if (scenarioText) scenarioText.textContent = template.scenario;

    this.renderCaseQuestions();
    this.openModal('case-assessment-modal');
    this.setCaseTab('video');
    this.showToast('Entered Live Interview Room. Click "Start My Camera & Mic" to begin.', 'info');
  }

  renderCaseQuestions() {
    if (!this.activeCaseAssessment) return;
    const container = document.getElementById('case-questions-container');
    if (!container) return;

    const questions = this.activeCaseAssessment.template.questions;
    const answers = this.activeCaseAssessment.answers;
    const letters = ['A', 'B', 'C', 'D'];

    container.innerHTML = questions.map((q, qIdx) => {
      const selected = answers[qIdx];
      const optionsHtml = q.options.map((opt, optIdx) => {
        const isChosen = (selected === optIdx);
        return `
          <div class="p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3.5 ${
            isChosen ? 'border-2 border-violet-600 bg-gradient-to-r from-violet-50/95 to-indigo-50/90 text-violet-950 font-bold shadow-md shadow-violet-500/10' : 'border-slate-200 bg-white hover:bg-violet-50/30 text-slate-800'
          }" onclick="app.selectCaseOption(${qIdx}, ${optIdx})">
            <div class="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
              isChosen ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 border border-slate-200'
            }">
              ${letters[optIdx]}
            </div>
            <div class="text-xs sm:text-sm leading-relaxed">
              ${opt}
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="cand-glass-card p-5 sm:p-6 rounded-3xl border border-indigo-100/80 bg-white space-y-3.5 shadow-xs">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="font-bold text-xs text-violet-700 font-mono bg-violet-50 px-2.5 py-1 rounded-lg border border-violet-100">Case Question ${qIdx + 1} of ${questions.length}</span>
              ${q.hint ? `<span class="text-[11px] text-slate-400">• Hint: ${q.hint}</span>` : ''}
            </div>
            <span class="text-[11px] font-bold ${selected !== undefined ? 'cand-tag-emerald px-2.5 py-0.5 rounded-full' : 'text-slate-400'}">
              ${selected !== undefined ? '✓ Selected' : 'Not answered'}
            </span>
          </div>
          <p class="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">${q.question}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            ${optionsHtml}
          </div>
        </div>
      `;
    }).join('');

    const answeredCount = Object.keys(answers).length;
    const counterEl = document.getElementById('case-answered-counter');
    if (counterEl) {
      counterEl.textContent = `${answeredCount} of ${questions.length} answered`;
    }
  }

  selectCaseOption(qIdx, optIdx) {
    if (!this.activeCaseAssessment) return;
    this.activeCaseAssessment.answers[qIdx] = optIdx;
    this.renderCaseQuestions();
  }

  setCaseTab(tab) {
    const casePanel = document.getElementById('case-panel-case');
    const videoPanel = document.getElementById('case-panel-video');
    const screenPanel = document.getElementById('case-panel-screen');

    const btnCase = document.getElementById('case-tab-btn-case');
    const btnVideo = document.getElementById('case-tab-btn-video');
    const btnScreen = document.getElementById('case-tab-btn-screen');

    if (casePanel) casePanel.classList.toggle('hidden', tab !== 'case');
    if (videoPanel) videoPanel.classList.toggle('hidden', tab !== 'video');
    if (screenPanel) screenPanel.classList.toggle('hidden', tab !== 'screen');

    const activeClasses = ['btn-jewel-primary', 'text-white', 'shadow-md'];
    const inactiveClasses = ['bg-white', 'hover:bg-slate-100', 'text-slate-700', 'border', 'border-slate-200'];

    [btnCase, btnVideo, btnScreen].forEach(btn => {
      if (!btn) return;
      btn.classList.remove(...activeClasses);
      btn.classList.add(...inactiveClasses);
    });

    if (tab === 'case' && btnCase) {
      btnCase.classList.remove(...inactiveClasses);
      btnCase.classList.add(...activeClasses);
    } else if (tab === 'video' && btnVideo) {
      btnVideo.classList.remove(...inactiveClasses);
      btnVideo.classList.add(...activeClasses);
    } else if (tab === 'screen' && btnScreen) {
      btnScreen.classList.remove(...inactiveClasses);
      btnScreen.classList.add(...activeClasses);
    }
  }

  // ==========================================
  // REAL WebRTC WEBCAM & AUDIO CONTROLLER
  // ==========================================
  async startWebcam() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        this.showToast('Camera API not available in this browser context. Starting Virtual Test Pattern.', 'warning');
        this.startVirtualWebcam();
        return;
      }

      // Stop any existing streams first
      this.stopWebcam();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: true
      });

      this.activeWebcamStream = stream;
      this.isMicMuted = false;
      this.isCamHidden = false;

      const videoEl = document.getElementById('candidate-webcam-video');
      const placeholder = document.getElementById('candidate-cam-placeholder');
      const overlays = document.getElementById('cam-active-overlays');
      const labelPower = document.getElementById('label-cam-power');
      const btnPower = document.getElementById('btn-toggle-cam-power');
      const resLabel = document.getElementById('cam-res-label');
      const timerEl = document.getElementById('video-session-timer');

      if (videoEl) {
        videoEl.srcObject = stream;
        videoEl.classList.remove('hidden');
        videoEl.play().catch(e => console.log('Video play caught:', e));
      }
      if (placeholder) placeholder.classList.add('hidden');
      if (overlays) overlays.classList.remove('hidden');

      if (labelPower) labelPower.textContent = 'Stop Camera';
      if (btnPower) {
        btnPower.classList.remove('bg-blue-600', 'hover:bg-blue-500');
        btnPower.classList.add('bg-rose-600', 'hover:bg-rose-500');
      }

      if (timerEl) {
        timerEl.textContent = '● Live Stream Connected';
      }

      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        if (resLabel && videoTrack.getSettings) {
          const s = videoTrack.getSettings();
          const w = s.width || 1280;
          const h = s.height || 720;
          resLabel.textContent = `${w}x${h} • Active`;
        }

        videoTrack.onended = () => {
          this.stopWebcam();
          this.showToast('Camera disconnected.', 'info');
        };
      }

      // Live Audio Frequency Visualizer Meter
      this.setupAudioMeter(stream);

      this.showToast('Webcam and Microphone activated successfully!', 'success');
    } catch (err) {
      console.warn('getUserMedia error:', err);
      let errMsg = 'Could not access camera/mic.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errMsg = 'Camera permission was denied. Please allow camera permissions in your browser address bar.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errMsg = 'No physical webcam detected on this device. Starting Virtual Test Pattern feed.';
        this.startVirtualWebcam();
        return;
      } else if (err.name === 'NotReadableError') {
        errMsg = 'Camera is currently in use by another application. Starting Virtual Test Pattern feed.';
        this.startVirtualWebcam();
        return;
      }
      this.showToast(errMsg, 'error');
    }
  }

  stopWebcam() {
    if (this.audioMeterAnimationId) {
      cancelAnimationFrame(this.audioMeterAnimationId);
      this.audioMeterAnimationId = null;
    }
    if (this.virtualCanvasAnimationId) {
      cancelAnimationFrame(this.virtualCanvasAnimationId);
      this.virtualCanvasAnimationId = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try { this.audioContext.close(); } catch (e) {}
      this.audioContext = null;
    }
    if (this.activeWebcamStream) {
      this.activeWebcamStream.getTracks().forEach(track => track.stop());
      this.activeWebcamStream = null;
    }

    const videoEl = document.getElementById('candidate-webcam-video');
    const placeholder = document.getElementById('candidate-cam-placeholder');
    const overlays = document.getElementById('cam-active-overlays');
    const labelPower = document.getElementById('label-cam-power');
    const btnPower = document.getElementById('btn-toggle-cam-power');
    const timerEl = document.getElementById('video-session-timer');

    if (videoEl) {
      videoEl.srcObject = null;
      videoEl.classList.add('hidden');
    }
    if (placeholder) placeholder.classList.remove('hidden');
    if (overlays) overlays.classList.add('hidden');

    if (labelPower) labelPower.textContent = 'Start Camera';
    if (btnPower) {
      btnPower.classList.add('bg-blue-600', 'hover:bg-blue-500');
      btnPower.classList.remove('bg-rose-600', 'hover:bg-rose-500');
    }
    if (timerEl) {
      timerEl.textContent = 'Ready • Session Open';
    }
  }

  toggleWebcamPower() {
    if (this.activeWebcamStream) {
      this.stopWebcam();
      this.showToast('Webcam turned off.', 'info');
    } else {
      this.startWebcam();
    }
  }

  toggleMic() {
    if (!this.activeWebcamStream) {
      this.showToast('Please start the camera and microphone first.', 'warning');
      return;
    }
    const audioTrack = this.activeWebcamStream.getAudioTracks()[0];
    if (!audioTrack) {
      this.showToast('No audio track available on current stream.', 'warning');
      return;
    }

    audioTrack.enabled = !audioTrack.enabled;
    this.isMicMuted = !audioTrack.enabled;

    const label = document.getElementById('label-mic-status');
    const badge = document.getElementById('cam-mic-badge');
    const btn = document.getElementById('btn-toggle-mic');
    const meterEl = document.getElementById('cam-audio-meter');

    if (this.isMicMuted) {
      if (label) label.textContent = 'Unmute Mic';
      if (badge) {
        badge.textContent = '🔇 MIC MUTED';
        badge.className = 'text-[10px] px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono';
      }
      if (btn) {
        btn.classList.add('bg-rose-900');
        btn.classList.remove('bg-slate-800');
      }
      if (meterEl) meterEl.style.width = '0%';
      this.showToast('Microphone muted.', 'info');
    } else {
      if (label) label.textContent = 'Mute Mic';
      if (badge) {
        badge.textContent = '🎤 MIC ON';
        badge.className = 'text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono';
      }
      if (btn) {
        btn.classList.remove('bg-rose-900');
        btn.classList.add('bg-slate-800');
      }
      this.showToast('Microphone unmuted.', 'info');
    }
  }

  toggleCamTrack() {
    if (!this.activeWebcamStream) {
      this.showToast('Please start the camera first.', 'warning');
      return;
    }
    const videoTrack = this.activeWebcamStream.getVideoTracks()[0];
    if (!videoTrack) return;

    videoTrack.enabled = !videoTrack.enabled;
    this.isCamHidden = !videoTrack.enabled;

    const label = document.getElementById('label-cam-track');
    const videoEl = document.getElementById('candidate-webcam-video');

    if (this.isCamHidden) {
      if (label) label.textContent = 'Show Video';
      if (videoEl) videoEl.style.opacity = '0.05';
      this.showToast('Video track paused (privacy mode).', 'info');
    } else {
      if (label) label.textContent = 'Hide Video';
      if (videoEl) videoEl.style.opacity = '1';
      this.showToast('Video track active.', 'info');
    }
  }

  setupAudioMeter(stream) {
    try {
      const audioTrack = stream.getAudioTracks()[0];
      if (!audioTrack) return;

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      this.audioContext = new AudioContextClass();
      const analyser = this.audioContext.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.5;

      const source = this.audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const meterEl = document.getElementById('cam-audio-meter');

      const tick = () => {
        if (!this.activeWebcamStream || this.isMicMuted) {
          if (meterEl) meterEl.style.width = '0%';
          return;
        }
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        const percent = Math.min(100, Math.round((avg / 128) * 100));

        if (meterEl) {
          meterEl.style.width = `${percent}%`;
          if (percent > 65) {
            meterEl.className = 'h-full bg-amber-400 transition-all duration-75';
          } else {
            meterEl.className = 'h-full bg-emerald-400 transition-all duration-75';
          }
        }
        this.audioMeterAnimationId = requestAnimationFrame(tick);
      };

      this.audioMeterAnimationId = requestAnimationFrame(tick);
    } catch (e) {
      console.warn('AudioContext visualization setup:', e);
    }
  }

  startVirtualWebcam() {
    this.stopWebcam();

    // Create an animated HTML5 canvas test feed
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');

    let frame = 0;
    const renderPattern = () => {
      frame++;
      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 640, 360);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 360);

      // Grid lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 640; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 360);
        ctx.stroke();
      }
      for (let y = 0; y < 360; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(640, y);
        ctx.stroke();
      }

      // Animated target circle
      const cx = 320 + Math.sin(frame * 0.05) * 40;
      const cy = 160 + Math.cos(frame * 0.05) * 20;

      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(37, 99, 235, 0.3)';
      ctx.fill();
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Face silhouette icon
      ctx.fillStyle = '#93c5fd';
      ctx.font = '40px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('👤', cx, cy);

      // Title & Telemetry text
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.fillStyle = '#f8fafc';
      ctx.fillText('SkillMatch Verified Candidate Stream (Virtual)', 320, 260);

      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(Math.floor(now.getMilliseconds() / 100)).padStart(1, '0');
      ctx.font = '12px monospace';
      ctx.fillStyle = '#34d399';
      ctx.fillText(`● PROCTOR LOCK: ACTIVE | UTC: ${timeStr} | FPS: 30`, 320, 290);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('Simulated WebRTC Hardware Test Feed', 320, 320);

      this.virtualCanvasAnimationId = requestAnimationFrame(renderPattern);
    };

    renderPattern();

    if (canvas.captureStream) {
      const stream = canvas.captureStream(30);
      this.activeWebcamStream = stream;

      const videoEl = document.getElementById('candidate-webcam-video');
      const placeholder = document.getElementById('candidate-cam-placeholder');
      const overlays = document.getElementById('cam-active-overlays');
      const labelPower = document.getElementById('label-cam-power');
      const btnPower = document.getElementById('btn-toggle-cam-power');
      const resLabel = document.getElementById('cam-res-label');

      if (videoEl) {
        videoEl.srcObject = stream;
        videoEl.classList.remove('hidden');
        videoEl.play().catch(e => console.log('Virtual stream play:', e));
      }
      if (placeholder) placeholder.classList.add('hidden');
      if (overlays) overlays.classList.remove('hidden');

      if (labelPower) labelPower.textContent = 'Stop Camera';
      if (btnPower) {
        btnPower.classList.remove('bg-blue-600', 'hover:bg-blue-500');
        btnPower.classList.add('bg-rose-600', 'hover:bg-rose-500');
      }
      if (resLabel) resLabel.textContent = '640x360 • Virtual Test';

      this.showToast('Virtual test pattern active! Video stream rendered at 30 FPS.', 'success');
    }
  }

  // ==========================================
  // REAL SCREEN SHARING BROADCAST CONTROLLER
  // ==========================================
  async startScreenShare() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        this.showToast('Screen sharing is not supported in this browser environment. Please use Google Chrome or Microsoft Edge.', 'error');
        return;
      }

      this.stopScreenShare();

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: 'always'
        },
        audio: false
      });

      this.activeScreenStream = stream;

      const videoEl = document.getElementById('candidate-screen-video');
      const placeholder = document.getElementById('screen-share-placeholder');
      const overlays = document.getElementById('screen-active-overlays');
      const statusBadge = document.getElementById('screen-session-status');
      const labelAction = document.getElementById('label-screen-action');
      const btnAction = document.getElementById('btn-screen-action');
      const resLabel = document.getElementById('screen-res-label');

      if (videoEl) {
        videoEl.srcObject = stream;
        videoEl.classList.remove('hidden');
        videoEl.play().catch(e => console.log('Screen play error:', e));
      }
      if (placeholder) placeholder.classList.add('hidden');
      if (overlays) overlays.classList.remove('hidden');

      if (statusBadge) {
        statusBadge.textContent = '● Broadcasting Live';
        statusBadge.className = 'text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800';
      }
      if (labelAction) labelAction.textContent = 'Stop Screen Share';
      if (btnAction) {
        btnAction.classList.remove('bg-purple-600', 'hover:bg-purple-500');
        btnAction.classList.add('bg-rose-600', 'hover:bg-rose-500');
      }

      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        if (resLabel && videoTrack.getSettings) {
          const s = videoTrack.getSettings();
          const w = s.width || 1920;
          const h = s.height || 1080;
          resLabel.textContent = `${w}x${h} • Live`;
        }

        // Native floating Edge/Chrome bar "Stop sharing" event
        videoTrack.onended = () => {
          this.stopScreenShare();
          this.showToast('Screen sharing ended.', 'info');
        };
      }

      this.showToast('Screen broadcast active! Recruiter review session connected.', 'success');
    } catch (err) {
      if (err.name === 'AbortError' || err.name === 'NotAllowedError') {
        this.showToast('Screen sharing selection was dismissed.', 'info');
      } else {
        console.warn('getDisplayMedia error:', err);
        this.showToast('Unable to initiate screen broadcast: ' + (err.message || 'Permission denied'), 'error');
      }
    }
  }

  stopScreenShare() {
    if (this.activeScreenStream) {
      this.activeScreenStream.getTracks().forEach(track => track.stop());
      this.activeScreenStream = null;
    }

    const videoEl = document.getElementById('candidate-screen-video');
    const placeholder = document.getElementById('screen-share-placeholder');
    const overlays = document.getElementById('screen-active-overlays');
    const statusBadge = document.getElementById('screen-session-status');
    const labelAction = document.getElementById('label-screen-action');
    const btnAction = document.getElementById('btn-screen-action');

    if (videoEl) {
      videoEl.srcObject = null;
      videoEl.classList.add('hidden');
    }
    if (placeholder) placeholder.classList.remove('hidden');
    if (overlays) overlays.classList.add('hidden');

    if (statusBadge) {
      statusBadge.textContent = 'Screen Standby';
      statusBadge.className = 'text-xs font-mono text-purple-400 bg-purple-950/80 px-2.5 py-1 rounded-lg border border-purple-800';
    }
    if (labelAction) labelAction.textContent = 'Start Live Screen Share';
    if (btnAction) {
      btnAction.classList.add('bg-purple-600', 'hover:bg-purple-500');
      btnAction.classList.remove('bg-rose-600', 'hover:bg-rose-500');
    }
  }

  toggleScreenShare() {
    if (this.activeScreenStream) {
      this.stopScreenShare();
      this.showToast('Screen sharing stopped.', 'info');
    } else {
      this.startScreenShare();
    }
  }

  stopAllMediaStreams() {
    this.stopWebcam();
    this.stopScreenShare();
  }

  // Legacy wrappers for backwards compatibility
  togglePrototypeMic(btn) {
    this.toggleMic();
  }

  togglePrototypeCam(btn) {
    this.toggleCamTrack();
  }

  submitCaseAssessment() {
    try {
      if (!this.activeCaseAssessment) {
        // Safe auto-recovery: try to infer active assessment from open jobs
        const state = window.appStore ? window.appStore.getState() : {};
        const firstJob = (state.jobs && state.jobs.length > 0) ? state.jobs[0] : null;
        if (firstJob) {
          const template = getCaseTemplateForJob(firstJob.id, firstJob.title);
          this.activeCaseAssessment = { job: firstJob, template, answers: {} };
        } else {
          this.showToast('No active case assessment found. Please select a job to apply.', 'warning');
          return;
        }
      }

      const { job, template, answers } = this.activeCaseAssessment;
      if (!job || !template) {
        this.showToast('Assessment details are incomplete. Please select a job to apply.', 'warning');
        return;
      }

      const questions = template.questions || [];
      const answersObj = answers || {};
      const answeredCount = Object.keys(answersObj).length;

      if (questions.length > 0 && answeredCount < questions.length) {
        let userConfirmed = true;
        try {
          userConfirmed = window.confirm(`You have answered ${answeredCount} of ${questions.length} questions. Unanswered questions will be scored 0. Submit now?`);
        } catch (dialogErr) {
          userConfirmed = true; // Proceed if dialogs are restricted by environment
        }
        if (!userConfirmed) return;
      }

      const state = window.appStore ? window.appStore.getState() : {};
      const cand = state.candidate || 
        (state.candidateAuth && window.appStore && window.appStore.getCandidateProfile ? window.appStore.getCandidateProfile(state.candidateAuth.email) : null) || 
        { id: 'FH1001', name: 'Candidate', email: 'ragav.v@student.edu' };

      // Grade case assessment using FairHireScoring
      const caseResult = window.FairHireScoring.calculateCaseAssessmentScore(template, answersObj);

      // Submit application using FairHireScoring
      const result = window.FairHireScoring.submitApplication(job.id, cand.id, caseResult);

      if (result.success) {
        if (window.FairHireAPI && result.application) {
          try {
            window.FairHireAPI.submitApplication(result.application);
          } catch (apiErr) {
            console.warn('FairHireAPI submit warning:', apiErr);
          }
        }
        this.closeModal('case-assessment-modal');
        this.showToast(result.message || `Application submitted for ${job.title}! Case Score: ${caseResult.score}/${caseResult.totalQuestions} (${caseResult.percentage}%).`, 'success');
        this.setCandidateTab('applications');
        this.renderCandidatePortal();
      } else {
        if (result.isDuplicate) {
          this.closeModal('case-assessment-modal');
          this.showToast(result.message, 'info');
          this.setCandidateTab('applications');
          this.renderCandidatePortal();
        } else {
          this.showToast(result.message || 'Submission failed. Please try again.', 'error');
        }
      }
    } catch (err) {
      console.error('Error submitting case assessment:', err);
      this.showToast('Submission error: ' + (err.message || 'Please retry.'), 'error');
    }
  }

  confirmAndSubmitApplication() {
    this.closeModal('application-modal');
    if (this.selectedJobForApply) {
      this.openApplyModal(this.selectedJobForApply.id);
    }
  }

  // ==========================================
  // 8. MY APPLICATIONS (TASK 3 & 4)
  // Single Source of Truth from state.applications
  // ==========================================
  renderMyApplications() {
    const state = window.appStore.getState();
    const cand = state.candidate || window.appStore.getCandidateProfile(state.candidateAuth.email);
    const container = document.getElementById('my-applications-list');
    if (!container) return;

    container.innerHTML = '';

    const myApps = (state.applications || []).filter(a => 
      a.candidateId === cand.id || 
      (a.candidateEmail && cand.email && a.candidateEmail.toLowerCase() === cand.email.toLowerCase())
    );

    if (myApps.length === 0) {
      container.innerHTML = `
        <div class="cand-glass-card p-12 rounded-3xl border border-indigo-100 text-center space-y-4 bg-white shadow-sm">
          <span class="text-4xl block">📋</span>
          <h4 class="font-black text-slate-900 text-base">No Applications Submitted Yet</h4>
          <p class="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">Explore available jobs that match your FairHire Score and complete role-specific case assessments to apply.</p>
          <button onclick="app.setCandidateTab('jobs')" class="px-6 py-3 rounded-2xl btn-jewel-primary text-white font-bold text-xs shadow-md transition">
            Explore Open Opportunities →
          </button>
        </div>
      `;
      return;
    }

    myApps.forEach(app => {
      let badgeClass = 'cand-tag-cyan px-3 py-1 rounded-full text-xs font-bold';
      if (app.status === 'SELECTED' || app.status === 'Accepted') badgeClass = 'cand-tag-emerald px-3 py-1 rounded-full text-xs font-bold';
      else if (app.status === 'REJECTED' || app.status === 'Rejected') badgeClass = 'cand-tag-rose px-3 py-1 rounded-full text-xs font-bold';
      else if (app.status === 'INTERVIEW_REQUESTED') badgeClass = 'cand-tag-violet px-3 py-1 rounded-full text-xs font-bold';

      const genScoreDisplay = app.generalScore !== null && app.generalScore !== undefined
        ? `${app.generalScore}/15 (${app.generalPercentage}%)`
        : 'Completed';

      const caseScoreDisplay = app.caseScore !== null && app.caseScore !== undefined
        ? `${app.caseScore}/6 (${app.casePercentage}%)`
        : 'Pending';

      const card = document.createElement('div');
      card.className = 'cand-glass-card p-6 sm:p-7 rounded-3xl border border-indigo-100 shadow-md space-y-4 bg-white hover:border-violet-200 transition';
      card.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <h4 class="font-black text-slate-900 text-lg tracking-tight">${app.jobTitle}</h4>
              <span class="${badgeClass}">
                ${app.status}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-1 font-medium">${app.company} • Applied: <span class="font-mono text-slate-700 font-semibold">${app.appliedDate}</span> • App ID: <span class="font-mono font-bold text-violet-700">${app.id}</span></p>
          </div>

          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-center text-xs">
              <span class="text-[10px] text-indigo-500 font-medium block">General Assess</span>
              <span class="font-bold text-indigo-950">${genScoreDisplay}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-purple-50/70 border border-purple-100 text-center text-xs">
              <span class="text-[10px] text-purple-500 font-medium block">Case Assess</span>
              <span class="font-bold text-purple-950">${caseScoreDisplay}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 border border-violet-200 text-center text-xs">
              <span class="text-[10px] text-violet-700 font-bold block">FairHire Score</span>
              <span class="font-black text-violet-800">${this.getComputedScoreForApp(app)}/50</span>
            </div>
          </div>
        </div>

        ${app.interviewRequest ? `
          <div class="p-5 rounded-2xl bg-gradient-to-r from-indigo-950 via-purple-950 to-pink-950 text-white space-y-3 border border-purple-500/30 shadow-xl">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 font-bold text-xs text-purple-200">
                <span>📅 RECRUITER INTERVIEW REQUEST</span>
                <span class="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/40 text-[10px] font-mono font-bold">${app.interviewRequest.type}</span>
              </div>
              <span class="text-[11px] font-mono text-emerald-300 font-bold">Action Required</span>
            </div>
            <div class="flex items-center gap-4 text-xs font-mono text-purple-100">
              <span><strong>Date:</strong> ${app.interviewRequest.date}</span>
              <span><strong>Time:</strong> ${app.interviewRequest.time}</span>
            </div>
            ${app.interviewRequest.message ? `
              <p class="text-xs text-slate-200 bg-black/40 p-3 rounded-xl border border-white/10 leading-relaxed">
                <strong class="text-purple-300">Instructions:</strong> "${app.interviewRequest.message}"
              </p>
            ` : ''}
            <div class="flex justify-end pt-1">
              <button onclick="app.openInterviewRoom('${app.jobId || 'job-1'}')" class="px-5 py-2.5 btn-jewel-primary text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5 cursor-pointer">
                <span>📹 Join Live Interview Room →</span>
              </button>
            </div>
          </div>
        ` : ''}

        ${app.hrFeedback ? `
          <div class="text-xs bg-violet-50/60 p-4 rounded-2xl border border-violet-200 text-slate-800">
            <span class="font-bold text-violet-900">HR Transparency Feedback:</span> "${app.hrFeedback}"
          </div>
        ` : ''}
      `;
      container.appendChild(card);
    });
  }

  // ==========================================
  // 9. SKILL GAP ANALYZER
  // ==========================================
  renderSkillGapAnalyzer() {
    const cand = window.appStore.getState().candidate;
    const gapData = window.FairHireScoring.generateSkillGap(cand, this.currentSkillGapRole);

    document.getElementById('gap-role-display').textContent = gapData.targetRole;

    // Render candidate verified skills
    const candSkillsContainer = document.getElementById('gap-cand-skills');
    candSkillsContainer.innerHTML = '';
    gapData.candidateSkills.forEach(sk => {
      const tag = document.createElement('span');
      tag.className = 'cand-tag-emerald text-xs px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-xs';
      tag.innerHTML = `<span>✓</span> <strong>${sk}</strong>`;
      candSkillsContainer.appendChild(tag);
    });

    // Render skill gaps
    const gapsContainer = document.getElementById('gap-missing-skills');
    gapsContainer.innerHTML = '';
    gapData.skillGaps.forEach(sk => {
      const tag = document.createElement('span');
      tag.className = 'cand-tag-amber text-xs px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-xs';
      tag.innerHTML = `<span>⚠</span> <strong>${sk}</strong>`;
      gapsContainer.appendChild(tag);
    });

    // Render learning path
    const pathContainer = document.getElementById('gap-learning-path');
    pathContainer.innerHTML = '';
    gapData.learningPath.forEach(step => {
      const item = document.createElement('div');
      item.className = 'cand-glass-card p-5 rounded-2xl border border-slate-200 hover:border-violet-300 transition flex items-start gap-4 shadow-xs bg-white';
      item.innerHTML = `
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-sm">
          ${step.step}
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <h5 class="font-bold text-slate-900 text-sm">${step.title}</h5>
            <span class="cand-tag-violet text-xs px-2.5 py-0.5 rounded-full font-bold">${step.status}</span>
          </div>
          <p class="text-xs text-slate-600 mt-1 leading-relaxed">${step.desc}</p>
        </div>
      `;
      pathContainer.appendChild(item);
    });
  }

  setSkillGapRole(role) {
    this.currentSkillGapRole = role;
    this.renderSkillGapAnalyzer();
  }

  // ==========================================
  // 10. HR PORTAL
  // ==========================================
  renderHRPortal() {
    const state = window.appStore.getState();
    const isAuth = state.hrAuth.isLoggedIn;
    const activeTab = state.activeHRTab;

    const authGate = document.getElementById('hr-auth-gate');
    const authDashboard = document.getElementById('hr-auth-dashboard');

    if (!isAuth) {
      authGate.classList.remove('hidden');
      authDashboard.classList.add('hidden');
      return;
    }

    authGate.classList.add('hidden');
    authDashboard.classList.remove('hidden');

    // Sidebar items
    document.querySelectorAll('.hr-nav-item').forEach(item => {
      const tab = item.getAttribute('data-tab');
      if (tab === activeTab) {
        item.classList.add('bg-blue-50', 'text-blue-700', 'font-bold', 'border-r-4', 'border-blue-600');
        item.classList.remove('text-slate-600', 'hover:bg-slate-100');
      } else {
        item.classList.remove('bg-blue-50', 'text-blue-700', 'font-bold', 'border-r-4', 'border-blue-600');
        item.classList.add('text-slate-600', 'hover:bg-slate-100');
      }
      item.onclick = (e) => {
        e.preventDefault();
        this.setHRTab(tab);
      };
    });

    // Subviews for all 8 tabs + settings
    const hrViews = {
      'dashboard': 'hr-tab-dashboard',
      'jobs': 'hr-tab-jobs',
      'applicants': 'hr-tab-applicants',
      'evaluation': 'hr-tab-evaluation',
      'assessments': 'hr-tab-assessments',
      'interviews': 'hr-tab-interviews',
      'notifications': 'hr-tab-notifications',
      'audithistory': 'hr-tab-audithistory',
      'settings': 'hr-tab-settings'
    };

    Object.keys(hrViews).forEach(k => {
      const el = document.getElementById(hrViews[k]);
      if (el) {
        if (k === activeTab) el.classList.remove('hidden');
        else el.classList.add('hidden');
      }
    });

    if (activeTab === 'dashboard') this.renderHRDashboardMetrics();
    else if (activeTab === 'jobs') this.renderHRJobsList();
    else if (activeTab === 'applicants') this.renderHRApplicantsTable();
    else if (activeTab === 'evaluation') this.renderHREvaluationTable();
    else if (activeTab === 'interviews') this.renderHRInterviews();
    else if (activeTab === 'notifications') this.renderHRNotifications();
    else if (activeTab === 'audithistory') this.renderHRAuditHistory();
  }

  renderHRDashboardMetrics() {
    const state = window.appStore.getState();
    const metrics = state.hrMetrics;

    const jobsEl = document.getElementById('hr-metric-jobs');
    const appsEl = document.getElementById('hr-metric-applicants');
    const pendEl = document.getElementById('hr-metric-pending');
    const accEl = document.getElementById('hr-metric-accepted');
    const rejEl = document.getElementById('hr-metric-rejected');

    if (jobsEl) jobsEl.textContent = metrics.totalJobs;
    if (appsEl) appsEl.textContent = metrics.totalApplicants;
    if (pendEl) pendEl.textContent = metrics.pending;
    if (accEl) accEl.textContent = metrics.accepted;
    if (rejEl) rejEl.textContent = metrics.rejected;

    // Quick applicant table preview on dashboard
    this.renderHRApplicantsTable('hr-dashboard-recent-table');
  }

  renderHRJobsList() {
    const container = document.getElementById('hr-jobs-container');
    if (!container) return;

    const sampleHrJobs = [
      { title: 'Java Developer', company: 'ABC Technologies', applicants: 126, activeDate: 'Active since Aug 2026' },
      { title: 'Python Developer', company: 'Tech Company', applicants: 58, activeDate: 'Active since Sep 2026' },
      { title: 'Web Developer', company: 'XYZ Solutions', applicants: 72, activeDate: 'Active since Aug 2026' },
      { title: 'Associate Cloud Engineer', company: 'AWS', applicants: 94, activeDate: 'Active since Sep 2026' },
      { title: 'Software Developer', company: 'Zoho', applicants: 110, activeDate: 'Active since Sep 2026' }
    ];

    container.innerHTML = '';
    sampleHrJobs.forEach(job => {
      const card = document.createElement('div');
      card.className = 'bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between';
      card.innerHTML = `
        <div>
          <span class="text-xs font-mono uppercase text-blue-700 font-bold">${job.company}</span>
          <h4 class="font-bold text-slate-900 text-lg">${job.title}</h4>
          <p class="text-xs text-slate-500 mt-1">${job.applicants} Verified Applicants • ${job.activeDate}</p>
        </div>
        <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition shadow-xs"
                onclick="app.filterHRApplicantsByJob('${job.title}')">
          View Applicants →
        </button>
      `;
      container.appendChild(card);
    });
  }

  filterHRApplicantsByJob(jobTitle) {
    this.setHRTab('applicants');
    const searchInput = document.getElementById('hr-search-applicants');
    if (searchInput) {
      searchInput.value = jobTitle;
      this.renderHRApplicantsTable();
    }
  }

  // Applicants Management Table with Assessment-Lock Integration & Applications Flow (Task 3)
  renderHRApplicantsTable(targetId = 'hr-applicants-tbody') {
    const tbody = document.getElementById(targetId);
    if (!tbody) return;

    const state = window.appStore.getState();
    let applications = [...(state.applications || [])];

    // Search query filter
    const searchInput = document.getElementById('hr-search-applicants');
    if (searchInput && searchInput.value.trim()) {
      const query = searchInput.value.toLowerCase().trim();
      applications = applications.filter(a => 
        (a.id && a.id.toLowerCase().includes(query)) ||
        (a.candidateId && a.candidateId.toLowerCase().includes(query)) ||
        (a.candidateName && a.candidateName.toLowerCase().includes(query)) ||
        (a.jobTitle && a.jobTitle.toLowerCase().includes(query)) ||
        (a.company && a.company.toLowerCase().includes(query))
      );
    }

    // Status filter
    const statusSelect = document.getElementById('hr-filter-status');
    if (statusSelect && statusSelect.value !== 'all') {
      const val = statusSelect.value;
      if (val === 'Pending') {
        applications = applications.filter(a => a.status === 'APPLIED' || a.status === 'UNDER_REVIEW' || a.status === 'Pending');
      } else if (val === 'Accepted') {
        applications = applications.filter(a => a.status === 'SELECTED' || a.status === 'Accepted');
      } else if (val === 'Rejected') {
        applications = applications.filter(a => a.status === 'REJECTED' || a.status === 'Rejected');
      } else {
        applications = applications.filter(a => a.status === val);
      }
    }

    // Sort by score
    const sortSelect = document.getElementById('hr-sort-score');
    if (sortSelect && sortSelect.value === 'desc') {
      applications.sort((a, b) => this.getComputedScoreForApp(b) - this.getComputedScoreForApp(a));
    } else if (sortSelect && sortSelect.value === 'asc') {
      applications.sort((a, b) => this.getComputedScoreForApp(a) - this.getComputedScoreForApp(b));
    }

    tbody.innerHTML = '';

    if (applications.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-slate-500 bg-white">No applicants match your criteria.</td></tr>`;
      return;
    }

    applications.forEach(app => {
      let badge = 'bg-amber-50 text-amber-700 border border-amber-200';
      if (app.status === 'SELECTED' || app.status === 'Accepted') {
        badge = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      } else if (app.status === 'REJECTED' || app.status === 'Rejected') {
        badge = 'bg-rose-50 text-rose-700 border border-rose-200';
      } else if (app.status === 'INTERVIEW_REQUESTED') {
        badge = 'bg-blue-50 text-blue-700 border border-blue-200';
      }

      const candName = app.candidateName || (app.candidateProfile && app.candidateProfile.name) || 'Candidate';
      const prof = app.candidateProfile || {};
      const skills = prof.skills || ['Java', 'SQL', 'Algorithms'];
      const verifiedScore = this.getComputedScoreForApp(app);

      const tr = document.createElement('tr');
      tr.className = 'border-b border-slate-100 hover:bg-slate-50/80 text-xs transition';
      tr.innerHTML = `
        <td class="p-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center font-bold text-xs shrink-0">
              ${candName.charAt(0).toUpperCase()}
            </div>
            <div>
              <span class="font-mono font-bold text-blue-700 block">${app.id}</span>
              <span class="text-[11px] text-slate-500 font-mono">${app.candidateId}</span>
            </div>
          </div>
        </td>
        <td class="p-4">
          <span class="font-bold text-slate-900 block">${candName}</span>
          <span class="text-slate-500 text-[11px]">${app.jobTitle} • ${app.company}</span>
        </td>
        <td class="p-4">
          <div class="flex items-center gap-2">
            <span class="font-black text-sm text-slate-900">${verifiedScore}</span><span class="text-slate-400 text-xs">/50</span>
            <div class="w-14 bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div class="bg-blue-600 h-1.5 rounded-full" style="width: ${Math.min(100, Math.round((verifiedScore/50)*100))}%"></div>
            </div>
          </div>
        </td>
        <td class="p-4">
          <div class="text-xs space-y-0.5">
            <span class="text-emerald-700 font-semibold">MCQ: ${app.generalScore !== null && app.generalScore !== undefined ? `${app.generalScore}/15` : 'Done'}</span>
            <span class="text-slate-300 mx-1">•</span>
            <span class="text-indigo-700 font-semibold">Case: ${app.caseScore !== null && app.caseScore !== undefined ? `${app.caseScore}/6` : 'Pending'}</span>
          </div>
        </td>
        <td class="p-4">
          <div class="flex flex-wrap gap-1 max-w-[200px]">
            ${skills.slice(0, 3).map(s => `<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200">${typeof s === 'string' ? s : s.name}</span>`).join('')}
          </div>
        </td>
        <td class="p-4">
          <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold ${badge}">${app.status}</span>
        </td>
        <td class="p-4 text-right">
          <button class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition"
                  onclick="app.openHRCandidateModal('${app.id}')">
            Review
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Candidate Evaluation Table (Dedicated Assessment-Lock Protocol Tab)
  renderHREvaluationTable() {
    const tbody = document.getElementById('hr-evaluation-tbody');
    if (!tbody) return;

    const state = window.appStore.getState();
    tbody.innerHTML = '';

    (state.applications || []).forEach(app => {
      const candName = app.candidateName || (app.candidateProfile && app.candidateProfile.name) || 'Candidate';
      const tr = document.createElement('tr');
      tr.className = 'border-b border-slate-100 hover:bg-slate-50/80 text-xs transition';
      tr.innerHTML = `
        <td class="p-4">
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-xs border border-blue-100">${candName.charAt(0).toUpperCase()}</span>
            <div>
              <div class="font-bold text-slate-900">${candName}</div>
              <div class="text-[10px] text-slate-500 font-mono">${app.id} • ${app.candidateId}</div>
            </div>
          </div>
        </td>
        <td class="p-4">
          <span class="font-semibold text-slate-900">${app.jobTitle}</span>
          <p class="text-[11px] text-slate-500">${app.company}</p>
        </td>
        <td class="p-4 text-slate-600 font-mono text-[11px]">${app.appliedDate || '2026-09-12'}</td>
        <td class="p-4">
          <div class="text-xs">
            <span class="text-emerald-700 font-semibold">General: ${app.generalScore !== null && app.generalScore !== undefined ? `${app.generalScore}/15` : 'Completed'}</span>
            <p class="text-[11px] text-indigo-700 font-medium">Case: ${app.caseScore !== null && app.caseScore !== undefined ? `${app.caseScore}/6 (${app.casePercentage}%)` : 'Pending'}</p>
          </div>
        </td>
        <td class="p-4">
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">🔓 Unlocked</span>
        </td>
        <td class="p-4 text-right">
          <button class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition"
                  onclick="app.openHRCandidateModal('${app.id}')">
            Review Evaluation →
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Interviews Tab
  renderHRInterviews() {
    const tbody = document.getElementById('hr-interviews-tbody');
    if (!tbody) return;

    const state = window.appStore.getState();
    tbody.innerHTML = '';

    (state.hrInterviews || []).forEach(item => {
      const tr = document.createElement('tr');
      tr.className = 'border-b border-slate-100 hover:bg-slate-50/80 text-xs transition';
      tr.innerHTML = `
        <td class="p-4 font-mono font-bold text-blue-700">${item.candidateId}</td>
        <td class="p-4 font-medium text-slate-900">${item.jobTitle}</td>
        <td class="p-4 text-slate-600">${item.date} • ${item.time}</td>
        <td class="p-4 text-slate-700 font-medium">${item.round}</td>
        <td class="p-4 text-slate-500">${item.interviewer}</td>
        <td class="p-4">
          <span class="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">${item.status}</span>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Notifications Tab
  renderHRNotifications() {
    const container = document.getElementById('hr-notifications-list');
    if (!container) return;

    const state = window.appStore.getState();
    container.innerHTML = '';

    (state.hrNotifications || []).forEach(notif => {
      const card = document.createElement('div');
      card.className = 'p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5 text-xs text-slate-800';
      let icon = '🔔';
      if (notif.type === 'success') icon = '✅';
      else if (notif.type === 'warning') icon = '⚠️';

      card.innerHTML = `
        <span class="text-lg">${icon}</span>
        <div class="flex-1">
          <div class="flex items-center justify-between mb-1">
            <h4 class="font-bold text-slate-900">${notif.title}</h4>
            <span class="text-[10px] font-mono text-slate-400">${notif.time}</span>
          </div>
          <p class="text-slate-600 leading-relaxed">${notif.message}</p>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Audit History Tab
  renderHRAuditHistory() {
    const tbody = document.getElementById('hr-audit-tbody');
    if (!tbody) return;

    const state = window.appStore.getState();
    tbody.innerHTML = '';

    (state.hrAuditHistory || []).forEach(item => {
      const tr = document.createElement('tr');
      tr.className = 'border-b border-slate-100 hover:bg-slate-50/80 text-xs transition';
      let badge = (item.action === 'Accepted' || item.action.includes('SELECTED')) ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200';

      tr.innerHTML = `
        <td class="p-4 text-slate-500 font-mono text-[11px]">${item.timestamp}</td>
        <td class="p-4 font-mono font-bold text-blue-700">${item.candidateId}</td>
        <td class="p-4">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${badge}">${item.action}</span>
        </td>
        <td class="p-4 text-slate-700 font-medium">${item.recruiter}</td>
        <td class="p-4 text-slate-600 max-w-xs leading-relaxed">${item.reason}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ==========================================
  // 11. HR CANDIDATE DETAILS & ASSESSMENT-LOCK EVALUATION
  // ==========================================

  getComputedScoreForApp(app) {
    if (!app) return 42;
    if (typeof app.score === 'number' && !isNaN(app.score) && app.score > 0) {
      return app.score;
    }
    const state = window.appStore ? window.appStore.getState() : {};
    const cand = (state.candidate && (state.candidate.id === app.candidateId || (state.candidate.email && app.candidateEmail && state.candidate.email.toLowerCase() === app.candidateEmail.toLowerCase())))
      ? state.candidate
      : (window.appStore && window.appStore.getCandidateProfile ? window.appStore.getCandidateProfile(app.candidateEmail) : null);

    if (cand && cand.score && typeof cand.score.total === 'number') {
      app.score = cand.score.total;
      return app.score;
    }

    if (cand && window.FairHireScoring && window.FairHireScoring.calculateFairHireScore) {
      const calc = window.FairHireScoring.calculateFairHireScore(cand);
      app.score = calc.total;
      return app.score;
    }

    // Default based on seed application IDs
    if (app.id === 'app-seed-1') app.score = 42;
    else if (app.id === 'app-seed-2') app.score = 44;
    else if (app.id === 'app-seed-3') app.score = 38;
    else if (app.id === 'app-seed-4') app.score = 48;
    else app.score = 42;

    return app.score;
  }

  getCandidateAcademicValues(app) {
    if (!app) return { tenth: 79, twelfth: 72, cgpa: 8.5, tenthPts: 3.2, twelfthPts: 2.9, cgpaPts: 10.2, academicTotal: 16.3 };
    const prof = app.candidateProfile || {};
    const state = window.appStore ? window.appStore.getState() : {};
    const candStored = (window.appStore && window.appStore.getCandidateProfile) ? window.appStore.getCandidateProfile(app.candidateEmail || prof.email) : null;
    const activeCand = state.candidate;

    let tenth = 79;
    let twelfth = 72;
    let cgpa = 8.5;

    // Check active candidate profile first (reflecting live values candidate entered)
    if (activeCand && (activeCand.id === app.candidateId || (activeCand.email && app.candidateEmail && activeCand.email.toLowerCase() === app.candidateEmail.toLowerCase()))) {
      if (activeCand.academic) {
        if (activeCand.academic.tenthPercent !== undefined && activeCand.academic.tenthPercent !== null && activeCand.academic.tenthPercent !== '') {
          tenth = parseFloat(activeCand.academic.tenthPercent);
        }
        if (activeCand.academic.twelfthPercent !== undefined && activeCand.academic.twelfthPercent !== null && activeCand.academic.twelfthPercent !== '') {
          twelfth = parseFloat(activeCand.academic.twelfthPercent);
        }
        if (activeCand.academic.cgpa !== undefined && activeCand.academic.cgpa !== null && activeCand.academic.cgpa !== '') {
          cgpa = parseFloat(activeCand.academic.cgpa);
        }
      }
    } else if (candStored && candStored.academic) {
      if (candStored.academic.tenthPercent !== undefined && candStored.academic.tenthPercent !== null) {
        tenth = parseFloat(candStored.academic.tenthPercent);
      }
      if (candStored.academic.twelfthPercent !== undefined && candStored.academic.twelfthPercent !== null) {
        twelfth = parseFloat(candStored.academic.twelfthPercent);
      }
      if (candStored.academic.cgpa !== undefined && candStored.academic.cgpa !== null) {
        cgpa = parseFloat(candStored.academic.cgpa);
      }
    } else {
      if (prof.tenth !== undefined && prof.tenth !== null) tenth = parseFloat(prof.tenth);
      if (prof.twelfth !== undefined && prof.twelfth !== null) twelfth = parseFloat(prof.twelfth);
      if (prof.cgpa !== undefined && prof.cgpa !== null) cgpa = parseFloat(prof.cgpa);
    }

    if (isNaN(tenth) || tenth <= 0) tenth = 79;
    if (isNaN(twelfth) || twelfth <= 0) twelfth = 72;
    if (isNaN(cgpa) || cgpa <= 0) cgpa = 8.5;

    // Deterministic point allocations: 10th (max 4.0), 12th (max 4.0), CGPA (max 12.0)
    const tenthPts = Math.min(4, Math.round((tenth / 100) * 4 * 10) / 10);
    const twelfthPts = Math.min(4, Math.round((twelfth / 100) * 4 * 10) / 10);
    const cgpaPts = Math.min(12, Math.round((cgpa / 10) * 12 * 10) / 10);
    const academicTotal = Math.min(20, Math.round((tenthPts + twelfthPts + cgpaPts) * 10) / 10);

    return {
      tenth,
      twelfth,
      cgpa,
      tenthPts,
      twelfthPts,
      cgpaPts,
      academicTotal
    };
  }

  populateHRAcademicDetails(app) {
    const acad = this.getCandidateAcademicValues(app);

    // Update Academic pillar badge in score strip
    const academicEl = document.getElementById('hr-modal-cand-academic');
    if (academicEl) {
      academicEl.textContent = `${acad.academicTotal} / 20`;
    }

    // 10th Standard tile
    const tenthVal = document.getElementById('hr-academic-tenth-val');
    const tenthBar = document.getElementById('hr-academic-tenth-bar');
    const tenthPts = document.getElementById('hr-academic-tenth-pts');
    const tenthTier = document.getElementById('hr-academic-tenth-tier');
    if (tenthVal) tenthVal.textContent = `${acad.tenth}%`;
    if (tenthBar) tenthBar.style.width = `${Math.min(100, Math.max(0, acad.tenth))}%`;
    if (tenthPts) tenthPts.textContent = `${acad.tenthPts} / 4.0`;
    if (tenthTier) {
      tenthTier.textContent = acad.tenth >= 85 ? 'Distinction' : acad.tenth >= 60 ? 'First Class' : 'Passed';
    }

    // 12th Standard tile
    const twelfthVal = document.getElementById('hr-academic-twelfth-val');
    const twelfthBar = document.getElementById('hr-academic-twelfth-bar');
    const twelfthPts = document.getElementById('hr-academic-twelfth-pts');
    const twelfthTier = document.getElementById('hr-academic-twelfth-tier');
    if (twelfthVal) twelfthVal.textContent = `${acad.twelfth}%`;
    if (twelfthBar) twelfthBar.style.width = `${Math.min(100, Math.max(0, acad.twelfth))}%`;
    if (twelfthPts) twelfthPts.textContent = `${acad.twelfthPts} / 4.0`;
    if (twelfthTier) {
      twelfthTier.textContent = acad.twelfth >= 85 ? 'Distinction' : acad.twelfth >= 60 ? 'First Class' : 'Passed';
    }

    // Degree CGPA tile
    const cgpaVal = document.getElementById('hr-academic-cgpa-val');
    const cgpaPct = document.getElementById('hr-academic-cgpa-pct');
    const cgpaBar = document.getElementById('hr-academic-cgpa-bar');
    const cgpaPts = document.getElementById('hr-academic-cgpa-pts');
    const cgpaTier = document.getElementById('hr-academic-cgpa-tier');
    if (cgpaVal) cgpaVal.textContent = `${acad.cgpa}`;
    if (cgpaPct) cgpaPct.textContent = `(~${Math.round(acad.cgpa * 9.5)}%)`;
    if (cgpaBar) cgpaBar.style.width = `${Math.min(100, Math.max(0, Math.round((acad.cgpa / 10) * 100)))}%`;
    if (cgpaPts) cgpaPts.textContent = `${acad.cgpaPts} / 12.0`;
    if (cgpaTier) {
      cgpaTier.textContent = acad.cgpa >= 8.5 ? 'First Class with Distinction' : acad.cgpa >= 6.5 ? 'First Class' : 'Satisfactory';
    }

    // Transparent calculation summary row
    const calcTenth = document.getElementById('hr-academic-calc-tenth');
    const calcTwelfth = document.getElementById('hr-academic-calc-twelfth');
    const calcCgpa = document.getElementById('hr-academic-calc-cgpa');
    const calcTotal = document.getElementById('hr-academic-calc-total');
    const auditId = document.getElementById('hr-academic-audit-id');

    if (calcTenth) calcTenth.textContent = `${acad.tenthPts}`;
    if (calcTwelfth) calcTwelfth.textContent = `${acad.twelfthPts}`;
    if (calcCgpa) calcCgpa.textContent = `${acad.cgpaPts}`;
    if (calcTotal) calcTotal.textContent = `${acad.academicTotal} / 20.0 Total Academic Pts`;
    if (auditId) auditId.textContent = `ACAD-${(app.candidateId || 'FH1001')}-REGISTRY-OK`;

    // Also update standard education breakdown in Education section
    const marksEl = document.getElementById('hr-modal-cand-marks-breakdown');
    if (marksEl) {
      marksEl.innerHTML = `<strong>10th:</strong> ${acad.tenth}% • <strong>12th:</strong> ${acad.twelfth}% • <strong>Degree CGPA:</strong> ${acad.cgpa} / 10 (~${Math.round(acad.cgpa * 9.5)}%)`;
    }
  }

  toggleHRAcademicDetails() {
    const reviewPanel = document.getElementById('hr-academic-detailed-review');
    if (!reviewPanel) return;

    // Scroll smoothly to panel and flash highlight
    reviewPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    reviewPanel.classList.add('ring-4', 'ring-indigo-400', 'bg-indigo-100/60');
    setTimeout(() => {
      reviewPanel.classList.remove('ring-4', 'ring-indigo-400', 'bg-indigo-100/60');
    }, 1500);
    this.showToast('Inspecting verified candidate academic percentages.', 'info');
  }

  openHRCandidateModal(appIdOrCandId) {
    const state = window.appStore.getState();
    let app = (state.applications || []).find(a => a.id === appIdOrCandId);
    if (!app) {
      app = (state.applications || []).find(a => a.candidateId === appIdOrCandId);
    }
    if (!app) {
      const candLegacy = (state.hrApplicants || []).find(c => c.id === appIdOrCandId);
      if (candLegacy) {
        app = {
          id: 'APP-' + candLegacy.id,
          candidateId: candLegacy.id,
          candidateName: candLegacy.name || 'Candidate',
          candidateEmail: 'candidate@student.edu',
          jobTitle: candLegacy.appliedJobTitle,
          company: candLegacy.company,
          appliedDate: candLegacy.appliedDate || '2026-09-12',
          score: candLegacy.score || 42,
          generalScore: 13,
          generalPercentage: 86.7,
          caseScore: 5,
          casePercentage: 83.3,
          status: candLegacy.status,
          candidateProfile: {
            name: candLegacy.name || 'Candidate',
            education: 'B.Tech Computer Science & Engineering (CGPA: 8.5)',
            academicScore: candLegacy.academicScore || '17 / 20',
            technicalScore: candLegacy.technicalScore || '16 / 20',
            certificationsScore: candLegacy.certificationsScore || '4 / 5',
            projectsScore: candLegacy.projectsScore || '4 / 5',
            tenth: 79,
            twelfth: 72,
            cgpa: 8.5,
            skills: candLegacy.skills || ['Java', 'SQL'],
            certifications: [{ title: 'Java SE 11 Programmer', issuer: 'Oracle', year: '2025' }],
            projects: candLegacy.projects || ['Distributed Cache System']
          }
        };
      }
    }
    if (!app) return;

    this.selectedApplicationForHR = app;
    this.selectedCandidateForHR = app;
    this.pendingHRDecisionStatus = null;

    // Header updates
    document.getElementById('hr-modal-cand-id').textContent = `Application: ${app.id} • Candidate: ${app.candidateId}`;
    document.getElementById('hr-modal-cand-job').textContent = `${app.jobTitle} • ${app.company}`;

    const assessBadge = document.getElementById('hr-modal-assessment-badge');
    const evalBadge = document.getElementById('hr-modal-eval-badge');

    if (assessBadge) {
      assessBadge.textContent = '✓ Assessments Submitted';
      assessBadge.className = 'text-[10px] font-mono px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200';
    }

    if (evalBadge) {
      evalBadge.textContent = '🔓 Evaluation Unlocked';
      evalBadge.className = 'text-[10px] font-mono px-2 py-0.5 rounded font-semibold bg-blue-50 text-blue-700 border border-blue-200';
    }

    const lockedView = document.getElementById('hr-candidate-locked-view');
    const unlockedView = document.getElementById('hr-candidate-unlocked-view');
    const lockedNotice = document.getElementById('hr-decision-locked-notice');
    const unlockedControls = document.getElementById('hr-decision-unlocked-controls');

    if (lockedView) lockedView.classList.add('hidden');
    if (unlockedView) unlockedView.classList.remove('hidden');
    if (lockedNotice) lockedNotice.classList.add('hidden');
    if (unlockedControls) unlockedControls.classList.remove('hidden');

    const candName = app.candidateName || (app.candidateProfile && app.candidateProfile.name) || 'Candidate';
    const candEmail = app.candidateEmail || (app.candidateProfile && app.candidateProfile.email) || '';

    const nameEl = document.getElementById('hr-modal-cand-name');
    const emailEl = document.getElementById('hr-modal-cand-email');
    const dateEl = document.getElementById('hr-modal-cand-applied-date');
    const statusBadge = document.getElementById('hr-modal-cand-status-badge');

    if (nameEl) nameEl.textContent = candName;
    if (emailEl) emailEl.textContent = candEmail;
    if (dateEl) dateEl.textContent = app.appliedDate || 'Recent';
    if (statusBadge) {
      statusBadge.textContent = app.status;
      statusBadge.className = `px-2.5 py-0.5 rounded-full font-semibold text-[11px] ${
        app.status === 'SELECTED' || app.status === 'Accepted' ? 'badge-accepted' :
        app.status === 'REJECTED' || app.status === 'Rejected' ? 'badge-rejected' :
        app.status === 'INTERVIEW_REQUESTED' ? 'badge-interview font-bold' : 'badge-pending'
      }`;
    }

    // Score strip - Guaranteed non-undefined verified score
    const scoreEl = document.getElementById('hr-modal-cand-score');
    const genAssessEl = document.getElementById('hr-modal-cand-gen-assess');
    const caseAssessEl = document.getElementById('hr-modal-cand-case-assess');
    const techEl = document.getElementById('hr-modal-cand-tech');
    const certsEl = document.getElementById('hr-modal-cand-certs');

    const verifiedAppScore = this.getComputedScoreForApp(app);
    if (scoreEl) scoreEl.textContent = `${verifiedAppScore} / 50`;
    if (genAssessEl) {
      genAssessEl.textContent = app.generalScore !== null && app.generalScore !== undefined 
        ? `${app.generalScore} / 15 (${app.generalPercentage}%)`
        : 'Completed';
    }
    if (caseAssessEl) {
      caseAssessEl.textContent = app.caseScore !== null && app.caseScore !== undefined
        ? `${app.caseScore} / 6 (${app.casePercentage}%)`
        : 'Pending';
    }

    const prof = app.candidateProfile || {};
    if (techEl) techEl.textContent = prof.technicalScore || '17 / 20';
    if (certsEl) certsEl.textContent = prof.certificationsScore || '4 / 5';

    // Populate Detailed Academic Verification with exact percentages entered by candidate!
    this.populateHRAcademicDetails(app);

    // Education & Experience
    const eduEl = document.getElementById('hr-modal-cand-education');
    const expEl = document.getElementById('hr-modal-cand-experience');

    if (eduEl) eduEl.textContent = prof.education || 'B.Tech in Computer Science & Engineering';
    if (expEl) {
      expEl.textContent = prof.experience || 'Full Stack Engineering Intern • Tech Solutions';
    }

    // Skills
    const skillsContainer = document.getElementById('hr-modal-cand-skills');
    if (skillsContainer) {
      const skills = prof.skills || ['Java', 'SQL', 'Algorithms', 'Data Structures'];
      skillsContainer.innerHTML = skills.map(s => {
        const name = typeof s === 'string' ? s : s.name;
        const level = typeof s === 'object' && s.level ? `(${s.level})` : '';
        return `<span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono font-medium">${name} ${level}</span>`;
      }).join(' ');
    }

    // Certifications
    const certsContainer = document.getElementById('hr-modal-cand-certs-list');
    if (certsContainer) {
      const certs = prof.certifications || [{ title: 'Java SE 11 Professional Developer', issuer: 'Oracle', year: '2025' }];
      certsContainer.innerHTML = certs.map(c => {
        const title = typeof c === 'string' ? c : c.title;
        const issuer = typeof c === 'object' && c.issuer ? `${c.issuer} (${c.year || '2025'})` : 'Accredited';
        return `
          <div class="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0">
            <span class="font-medium text-slate-800">${title}</span>
            <span class="text-slate-500 font-mono text-[11px]">${issuer}</span>
          </div>
        `;
      }).join('');
    }

    // Projects
    const projectsContainer = document.getElementById('hr-modal-cand-projects-list');
    if (projectsContainer) {
      const projects = prof.projects || ['Fair Hiring Algorithmic Recruitment Engine'];
      projectsContainer.innerHTML = projects.map(p => {
        if (typeof p === 'string') {
          return `<div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-mono">• ${p}</div>`;
        }
        return `
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1 text-xs">
            <div class="font-bold text-slate-900">${p.title || 'Project'}</div>
            ${p.description ? `<p class="text-slate-600 text-[11px]">${p.description}</p>` : ''}
            ${p.technologies ? `<div class="text-blue-700 text-[10px] font-mono">Tech: ${Array.isArray(p.technologies) ? p.technologies.join(', ') : p.technologies}</div>` : ''}
          </div>
        `;
      }).join('');
    }

    // Scheduled Interview section if present
    const interviewSection = document.getElementById('hr-modal-cand-interview-section');
    const interviewStatus = document.getElementById('hr-modal-interview-status');
    const interviewDetails = document.getElementById('hr-modal-interview-details');

    if (interviewSection && interviewDetails) {
      if (app.interviewRequest) {
        interviewSection.classList.remove('hidden');
        if (interviewStatus) interviewStatus.textContent = (app.interviewRequest.type || 'INTERVIEW').toUpperCase();
        interviewDetails.innerHTML = `
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p><strong>Date & Time:</strong> ${app.interviewRequest.date} at ${app.interviewRequest.time}</p>
              <p><strong>Instructions Sent:</strong> "${app.interviewRequest.message || 'Standard technical evaluation.'}"</p>
            </div>
            <button type="button" onclick="app.closeModal('hr-candidate-modal'); app.openInterviewRoom('${app.jobId || 'job-1'}');" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shrink-0">
              <span>📹 Enter Proctor Room</span>
            </button>
          </div>
        `;
      } else {
        interviewSection.classList.add('hidden');
      }
    }

    // Comment input prefill
    const commentBox = document.getElementById('hr-decision-comment');
    if (commentBox) commentBox.value = app.hrFeedback || app.hrComment || '';

    this.openModal('hr-candidate-modal');
  }

  // Interview Request Handlers (Task 4)
  openInterviewRequestModal() {
    if (!this.selectedApplicationForHR) return;
    const app = this.selectedApplicationForHR;

    const candName = app.candidateName || (app.candidateProfile && app.candidateProfile.name) || 'Candidate';
    const nameEl = document.getElementById('interview-req-cand-name');
    const jobEl = document.getElementById('interview-req-job-title');

    if (nameEl) nameEl.textContent = `${candName} (${app.candidateId})`;
    if (jobEl) jobEl.textContent = `${app.jobTitle} • ${app.company}`;

    const dateInput = document.getElementById('interview-req-date');
    const timeInput = document.getElementById('interview-req-time');
    if (dateInput && !dateInput.value) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
    }
    if (timeInput && !timeInput.value) {
      timeInput.value = '14:00';
    }

    this.openModal('hr-interview-request-modal');
  }

  submitInterviewRequest() {
    if (!this.selectedApplicationForHR) return;
    const app = this.selectedApplicationForHR;

    const typeEl = document.getElementById('interview-req-type');
    const dateEl = document.getElementById('interview-req-date');
    const timeEl = document.getElementById('interview-req-time');
    const msgEl = document.getElementById('interview-req-message');

    const interviewData = {
      type: typeEl ? typeEl.value : 'Technical Interview',
      date: dateEl ? dateEl.value : '2026-10-01',
      time: timeEl ? timeEl.value : '14:00',
      message: msgEl ? msgEl.value.trim() : 'Please prepare for technical case discussion.'
    };

    const result = window.FairHireScoring.updateApplicationStatus(
      app.id,
      'INTERVIEW_REQUESTED',
      interviewData.message,
      interviewData
    );

    if (result.success) {
      if (window.FairHireAPI) {
        window.FairHireAPI.updateApplicationStatus(app.id, 'INTERVIEW_REQUESTED', interviewData.message, interviewData);
      }
      this.closeModal('hr-interview-request-modal');
      this.showToast(`Interview requested for ${app.candidateName || app.candidateId} on ${interviewData.date} at ${interviewData.time}. Candidate notified!`, 'success');
      this.openHRCandidateModal(app.id);
      this.renderHRApplicantsTable();
      this.renderHREvaluationTable();
    } else {
      this.showToast(result.message, 'error');
    }
  }

  setHRDecision(status) {
    this.pendingHRDecisionStatus = status;
    const label = document.getElementById('hr-decision-status-label');
    if (label) {
      label.textContent = `Decision Reason for ${status.toUpperCase()} (Mandatory):`;
    }
    this.showToast(`Selected decision: ${status}. Please enter mandatory feedback below and confirm.`, 'info');
  }

  submitHRDecision() {
    if (!this.selectedApplicationForHR) return;
    const app = this.selectedApplicationForHR;

    if (!this.pendingHRDecisionStatus) {
      this.showToast('Please select either ACCEPT or REJECT before saving the decision.', 'warning');
      return;
    }

    const commentInput = document.getElementById('hr-decision-comment');
    const comment = commentInput ? commentInput.value.trim() : '';
    if (!comment) {
      this.showToast('Mandatory: Please provide a job-related reason/feedback for this decision.', 'error');
      if (commentInput) commentInput.focus();
      return;
    }

    const newStatus = (this.pendingHRDecisionStatus === 'Accepted' || this.pendingHRDecisionStatus === 'SELECTED') ? 'SELECTED' : 'REJECTED';

    const result = window.FairHireScoring.updateApplicationStatus(
      app.id,
      newStatus,
      comment
    );

    if (result.success) {
      if (window.FairHireAPI) {
        window.FairHireAPI.updateApplicationStatus(app.id, newStatus, comment);
      }
      this.showToast(`Decision recorded: Application ${app.id} marked as ${newStatus}. Candidate notified transparently.`, 'success');
      this.closeModal('hr-candidate-modal');
      this.renderHRPortal();
    } else {
      this.showToast(result.message, 'error');
    }
  }



  // ==========================================
  // 12. AI COACH CHATBOT INTERACTION
  // ==========================================
  sendCoachMessage(query) {
    const history = document.getElementById('coach-messages');
    if (!history) return;

    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'flex justify-end';
    userMsg.innerHTML = `
      <div class="bg-blue-600 text-white rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] text-xs shadow-md">
        ${query}
      </div>
    `;
    history.appendChild(userMsg);
    history.scrollTop = history.scrollHeight;

    // Simulate realistic AI typing delay
    setTimeout(() => {
      const state = window.appStore.getState();
      const responseHtml = window.FairHireCoach.generateCoachResponse(query, state);

      const botMsg = document.createElement('div');
      botMsg.className = 'flex justify-start';
      botMsg.innerHTML = `
        <div class="bg-slate-800 text-slate-200 border border-slate-700 rounded-2xl rounded-tl-none px-4 py-3 max-w-[90%] text-xs shadow-md leading-relaxed">
          ${responseHtml}
        </div>
      `;
      history.appendChild(botMsg);
      history.scrollTop = history.scrollHeight;
    }, 450);
  }

  // ==========================================
  // UTILITIES & MODAL CONTROLLERS
  // ==========================================
  openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) {
      el.classList.remove('hidden');
      el.classList.add('flex');
    }
  }

  closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) {
      el.classList.add('hidden');
      el.classList.remove('flex');
    }
    if (modalId === 'case-assessment-modal') {
      this.stopAllMediaStreams();
    }
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    let border = 'border-blue-500 bg-slate-900 text-white';
    if (type === 'success') border = 'border-emerald-500 bg-slate-900 text-white';
    if (type === 'error') border = 'border-rose-500 bg-slate-900 text-white';
    if (type === 'warning') border = 'border-amber-500 bg-slate-900 text-white';

    toast.className = `p-4 rounded-xl border-l-4 shadow-2xl ${border} text-xs animate-slide-in flex items-center justify-between gap-4 max-w-md`;
    toast.innerHTML = `
      <span>${message}</span>
      <button class="text-slate-400 hover:text-white" onclick="this.parentElement.remove()">✕</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 4000);
  }

  hrLogout() {
    this.exitRecruiterWorkspace();
  }
}

// Global Instantiate
window.addEventListener('DOMContentLoaded', () => {
  window.app = new FairHireApp();
});

window.addEventListener('beforeunload', () => {
  if (window.app && typeof window.app.stopAllMediaStreams === 'function') {
    window.app.stopAllMediaStreams();
  }
});
