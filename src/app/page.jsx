"use client";
import React, {useState, useCallback} from "react";

function MainComponent() {
  const [activeSection, setActiveSection] = useState("roadmap");
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [loadingContent, setLoadingContent] = useState(false);
  const [relatedContent, setRelatedContent] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState({});
  const [quizHistory, setQuizHistory] = useState([]);
  const [codeOutput, setCodeOutput] = useState("");
  const [runningCode, setRunningCode] = useState(false);

  const [topics, setTopics] = useState([
    {
      title: "Arrays & Strings",
      duration: "4 weeks",
      content:
        "Single and multi-dimensional arrays, array manipulation techniques, dynamic memory allocation, string operations (strlen, strcpy, strcat), string parsing and manipulation, array sorting and searching algorithms.",
      difficulty: "Beginner",
      code: `#include <stdio.h>\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    for (int i = 0; i < 5; i++) {\n        printf("Element at index %d: %d\\n", i, arr[i]);\n    }\n    arr[2] = 99;\n    printf("After insertion, arr[2]: %d\\n", arr[2]);\n    return 0;\n}\n\n#include <stdio.h>\nint main() {\n    int matrix[2][2] = {{1, 2}, {3, 4}};\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 2; j++) {\n            printf("matrix[%d][%d] = %d\\n", i, j, matrix[i][j]);\n        }\n    }\n    return 0;\n}`,
      notes:
        "Arrays are fundamental data structures that store elements of the same type in contiguous memory locations. They provide constant-time access to elements using indices.",
      questions: [
        {
          question:
            "What is the time complexity of accessing an element in an array?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
          correctAnswer: "O(1)",
        },
        {
          question: "Which operation requires shifting elements in an array?",
          options: [
            "Insertion at beginning",
            "Access by index",
            "Update existing element",
            "Access last element",
          ],
          correctAnswer: "Insertion at beginning",
        },
      ],
    },
    {
      title: "Linked Lists",
      duration: "4 weeks",
      content:
        "Singly linked lists, doubly linked lists, circular linked lists, operations (insertion, deletion, traversal), memory management with pointers, list reversal, and merging techniques.",
      difficulty: "Intermediate",
      code: `#include <stdio.h>\n#include <stdlib.h>\nstruct Node {\n    int data;\n    struct Node* next;\n};\nvoid printList(struct Node* n) {\n    while (n != NULL) {\n        printf("%d -> ", n->data);\n        n = n->next;\n    }\n    printf("NULL\\n");\n}\nint main() {\n    struct Node* head = NULL;\n    struct Node* second = NULL;\n    struct Node* third = NULL;\n    head = (struct Node*)malloc(sizeof(struct Node));\n    second = (struct Node*)malloc(sizeof(struct Node));\n    third = (struct Node*)malloc(sizeof(struct Node));\n    head->data = 1; head->next = second;\n    second->data = 2; second->next = third;\n    third->data = 3; third->next = NULL;\n    printList(head);\n    return 0;\n}`,
      notes:
        "Linked Lists are dynamic data structures where elements are stored in nodes, each containing data and a reference to the next node. They excel at insertions and deletions.",
      questions: [
        {
          question:
            "What is the main advantage of a linked list over an array?",
          options: [
            "Dynamic size",
            "Constant time access",
            "Less memory usage",
            "Faster sorting",
          ],
          correctAnswer: "Dynamic size",
        },
        {
          question: "What is stored in each node of a singly linked list?",
          options: [
            "Data and next pointer",
            "Only data",
            "Two pointers",
            "Previous and next pointers",
          ],
          correctAnswer: "Data and next pointer",
        },
      ],
    },
    {
      title: "Stacks & Queues",
      duration: "3 weeks",
      content:
        "Stack implementation (array/linked list), operations (push, pop, peek), applications (expression evaluation, parenthesis matching), queue variations (circular, priority), deque implementation.",
      difficulty: "Intermediate",
      code: `#include <stdio.h>\n#define MAX 5\nint stack[MAX], top = -1;\nvoid push(int value) {\n    if (top == MAX - 1) {\n        printf("Stack Overflow\\n");\n        return;\n    }\n    stack[++top] = value;\n}\nint pop() {\n    if (top == -1) {\n        printf("Stack Underflow\\n");\n        return -1;\n    }\n    return stack[top--];\n}\n\n#include <stdio.h>\n#define MAX 5\nint queue[MAX], front = -1, rear = -1;\nvoid enqueue(int value) {\n    if (rear == MAX - 1) {\n        printf("Queue Overflow\\n");\n        return;\n    }\n    if (front == -1) front = 0;\n    queue[++rear] = value;\n}\nint dequeue() {\n    if (front == -1 || front > rear) {\n        printf("Queue Underflow\\n");\n        return -1;\n    }\n    return queue[front++];\n}`,
      notes:
        "Stacks follow LIFO (Last In First Out) principle, while Queues follow FIFO (First In First Out). Both are essential for various algorithms and applications.",
      questions: [
        {
          question: "What principle does a stack follow?",
          options: ["LIFO", "FIFO", "Random Access", "Priority Based"],
          correctAnswer: "LIFO",
        },
        {
          question: "Which operation is not typically found in a queue?",
          options: ["Peek", "Push", "Enqueue", "Dequeue"],
          correctAnswer: "Push",
        },
      ],
    },
    {
      title: "Trees",
      duration: "5 weeks",
      content:
        "Binary trees, binary search trees, tree traversals (in-order, pre-order, post-order), AVL trees, tree balancing, height calculations, and tree operations (insertion, deletion, searching).",
      difficulty: "Advanced",
      code: `#include <stdio.h>\n#include <stdlib.h>\nstruct Node {\n    int data;\n    struct Node* left;\n    struct Node* right;\n};\nstruct Node* newNode(int data) {\n    struct Node* node = (struct Node*)malloc(sizeof(struct Node));\n    node->data = data;\n    node->left = node->right = NULL;\n    return node;\n}\nvoid inOrder(struct Node* root) {\n    if (root != NULL) {\n        inOrder(root->left);\n        printf("%d ", root->data);\n        inOrder(root->right);\n    }\n}`,
      notes:
        "Trees are hierarchical data structures with a root node and subtrees. Binary Search Trees maintain ordered data for efficient searching and sorting.",
      questions: [
        {
          question: "What is the maximum number of children in a binary tree?",
          options: ["2", "1", "3", "Unlimited"],
          correctAnswer: "2",
        },
        {
          question: "Which traversal visits the root node first?",
          options: ["Pre-order", "In-order", "Post-order", "Level-order"],
          correctAnswer: "Pre-order",
        },
      ],
    },
    {
      title: "Graphs",
      duration: "4 weeks",
      content:
        "Graph representations (adjacency matrix/list), traversal algorithms (BFS/DFS), shortest path algorithms (Dijkstra's), minimum spanning trees, topological sorting.",
      difficulty: "Advanced",
      code: `#include <stdio.h>\n#define V 4\nvoid printMatrix(int graph[V][V]) {\n    for (int i = 0; i < V; i++) {\n        for (int j = 0; j < V; j++) {\n            printf("%d ", graph[i][j]);\n        }\n        printf("\\n");\n    }\n}\nint main() {\n    int graph[V][V] = {\n        {0, 1, 0, 1},\n        {1, 0, 1, 0},\n        {0, 1, 0, 1},\n        {1, 0, 1, 0}\n    };\n    printMatrix(graph);\n    return 0;\n}`,
      notes:
        "Graphs represent relationships between objects. They can be directed or undirected, weighted or unweighted, and are crucial for network and path-finding algorithms.",
      questions: [
        {
          question: "What is a vertex in a graph?",
          options: ["A node", "An edge", "A path", "A cycle"],
          correctAnswer: "A node",
        },
        {
          question:
            "Which algorithm finds the shortest path in a weighted graph?",
          options: ["Dijkstra's", "DFS", "BFS", "Prim's"],
          correctAnswer: "Dijkstra's",
        },
      ],
    },
    {
      title: "Hash Tables",
      duration: "3 weeks",
      content:
        "Hash function design, collision resolution (chaining, open addressing), load factor analysis, hash table resizing, applications in caching and symbol tables.",
      difficulty: "Advanced",
      code: `#include <stdio.h>\n#include <stdlib.h>\n#define SIZE 10\nstruct Node {\n    int data;\n    struct Node* next;\n};\nstruct Node* hashTable[SIZE];\nint hashFunction(int key) {\n    return key % SIZE;\n}\nvoid insert(int key) {\n    int index = hashFunction(key);\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = key;\n    newNode->next = hashTable[index];\n    hashTable[index] = newNode;\n}\nvoid printHashTable() {\n    for (int i = 0; i < SIZE; i++) {\n        struct Node* temp = hashTable[i];\n        printf("Index %d: ", i);\n        while (temp != NULL) {\n            printf("%d -> ", temp->data);\n            temp = temp->next;\n        }\n        printf("NULL\\n");\n    }\n}`,
      notes:
        "Hash Tables provide constant-time average case complexity for insertions and lookups. They use hash functions to map keys to array indices.",
      questions: [
        {
          question: "What is the purpose of a hash function?",
          options: [
            "Map keys to indices",
            "Sort data",
            "Encrypt data",
            "Compress data",
          ],
          correctAnswer: "Map keys to indices",
        },
        {
          question: "What happens when two keys hash to the same index?",
          options: ["Collision", "Overflow", "Underflow", "Nothing"],
          correctAnswer: "Collision",
        },
      ],
    },
  ]);

  const resources = [
    {
      title: "Key Concepts",
      items: [
        "Variables: Data types, scope, and storage classes",
        "Control Flow: Loops, conditionals, and switch statements",
        "Functions: Declaration, definition, and parameter passing",
        "Pointers: Memory addresses and pointer arithmetic",
        "Arrays: Static and dynamic array manipulation",
        "Structures: Custom data types and memory alignment",
      ],
    },
    {
      title: "Implementation Details",
      items: [
        "Memory Management: malloc, calloc, free operations",
        "File Operations: Reading and writing files in C",
        "Preprocessor: Macros and conditional compilation",
        "Debugging: GDB usage and memory debugging",
        "Compilation: Understanding the build process",
        "Standard Library: stdio.h, stdlib.h, string.h",
      ],
    },
    {
      title: "Best Practices",
      items: [
        "Code Style: Proper indentation and naming conventions",
        "Memory Safety: Avoiding buffer overflows and leaks",
        "Error Handling: Return codes and error checking",
        "Documentation: Function and structure documentation",
        "Optimization: Writing efficient C code",
        "Portability: Writing platform-independent code",
      ],
    },
    {
      title: "Textbooks",
      items: [
        "Introduction to Algorithms by CLRS",
        "C Programming Language by K&R",
        "Data Structures Using C by Reema Thareja",
        "Let Us C by Yashavant Kanetkar",
        "C: How to Program by Deitel & Deitel",
        "Programming in ANSI C by Balagurusamy",
      ],
    },
    {
      title: "Online Courses",
      items: [
        "CS50: Introduction to Computer Science",
        "C Programming Fundamentals",
        "Data Structures and Algorithms Specialization",
        "Mastering Data Structures & Algorithms in C",
        "Advanced C Programming Course",
        "Problem Solving through Programming in C",
      ],
    },
    {
      title: "Documentation",
      items: [
        "C Language Reference Manual",
        "GNU C Programming Tutorial",
        "C Standard Library Documentation",
        "POSIX Programmer's Manual",
        "GCC Documentation",
        "C Coding Standards Guide",
      ],
    },
    {
      title: "Community Forums",
      items: [
        "Stack Overflow C Community",
        "Reddit r/C_Programming",
        "CodeProject C Forums",
        "C Programming Discord Server",
        "Dev.to C Community",
        "C/C++ User Group Network",
      ],
    },
  ];

  const fetchRelatedContent = useCallback(async (topic) => {
    setLoadingContent(true);
    const response = await fetch(
      `/integrations/google-search/search?q=${encodeURIComponent(
        `${topic.title} programming tutorial site:geeksforgeeks.org OR site:tutorialspoint.com`
      )}`
    );
    const data = await response.json();
    setRelatedContent(data.items || []);
    setLoadingContent(false);
  }, []);
  const startQuiz = useCallback(() => {
    if (selectedTopic) {
      setQuizQuestions(selectedTopic.questions);
      setUserAnswers({});
      setQuizSubmitted(false);
    }
  }, [selectedTopic]);
  const handleAnswerChange = useCallback((questionIndex, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  }, []);
  const submitQuiz = useCallback(() => {
    setQuizSubmitted(true);
    const score = Object.values(userAnswers).filter(
      (answer, index) => answer === quizQuestions[index].correctAnswer
    ).length;
    const newResult = {
      topic: selectedTopic.title,
      score,
      total: quizQuestions.length,
      date: new Date().toISOString(),
    };
    setQuizHistory((prev) => [...prev, newResult]);
  }, [userAnswers, quizQuestions, selectedTopic]);

  const runCode = useCallback(async () => {
    if (!selectedTopic) return;

    setRunningCode(true);
    const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: `Given this C code, what would be its output? Please only return the exact output, no explanations:\n\n${selectedTopic.code}`,
          },
        ],
      }),
    });

    const data = await response.json();
    setCodeOutput(data.choices[0].message.content);
    setRunningCode(false);
  }, [selectedTopic]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <nav className="bg-white shadow-lg rounded-lg p-4 mb-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setActiveSection("roadmap")}
            className={`px-4 py-2 rounded-md ${
              activeSection === "roadmap"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Learning Roadmap
          </button>
          <button
            onClick={() => setActiveSection("resources")}
            className={`px-4 py-2 rounded-md ${
              activeSection === "resources"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Resources
          </button>
          <button
            onClick={() => setShowQuiz(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Take Quiz
          </button>
        </div>
      </nav>

      {activeSection === "roadmap" && !selectedTopic && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedTopic(topic)}
            >
              <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
              <div className="flex gap-2 mb-2">
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {topic.duration}
                </span>
                <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  {topic.difficulty}
                </span>
              </div>
              <p className="text-gray-600">{topic.content}</p>
            </div>
          ))}
        </div>
      )}

      {activeSection === "roadmap" && selectedTopic && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{selectedTopic.title}</h2>
            <button
              onClick={() => setSelectedTopic(null)}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Back to Roadmap
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Overview</h3>
              <p className="text-gray-600">{selectedTopic.content}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Example Code</h3>
              <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                <code>{selectedTopic.code}</code>
              </pre>
              <div className="mt-4">
                <button
                  onClick={runCode}
                  disabled={runningCode}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                >
                  {runningCode ? "Running..." : "Run Code"}
                </button>
                {codeOutput && (
                  <pre className="mt-4 bg-black text-green-400 p-4 rounded-md overflow-x-auto">
                    <code>{codeOutput}</code>
                  </pre>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Key Notes</h3>
              <p className="text-gray-600">{selectedTopic.notes}</p>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Related Resources</h3>
              {loadingContent ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ) : relatedContent.length > 0 ? (
                <div className="space-y-4">
                  {relatedContent.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                    >
                      <h4 className="font-medium text-blue-600 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">{item.snippet}</p>
                    </a>
                  ))}
                </div>
              ) : (
                <button
                  onClick={() => fetchRelatedContent(selectedTopic)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Find Related Content
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {activeSection === "resources" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((category, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Lesson Quiz</h2>
            {!quizQuestions.length ? (
              <button
                onClick={startQuiz}
                className="w-full bg-green-500 text-white py-2 rounded-md mb-4"
              >
                Start Quiz
              </button>
            ) : (
              <div className="space-y-4 mb-4">
                {quizQuestions.map((q, idx) => (
                  <div key={idx} className="border p-4 rounded-lg">
                    <p className="mb-2 font-medium">{q.question}</p>
                    <select
                      className="w-full p-2 border rounded"
                      value={userAnswers[idx] || ""}
                      onChange={(e) => handleAnswerChange(idx, e.target.value)}
                      disabled={quizSubmitted}
                    >
                      <option value="">Select an answer</option>
                      {q.options.map((opt, optIdx) => (
                        <option key={optIdx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {quizSubmitted && (
                      <p
                        className={`mt-2 ${
                          userAnswers[idx] === q.correctAnswer
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {userAnswers[idx] === q.correctAnswer
                          ? "✓ Correct!"
                          : `✗ Incorrect. The correct answer is: ${q.correctAnswer}`}
                      </p>
                    )}
                  </div>
                ))}
                {!quizSubmitted && (
                  <button
                    onClick={submitQuiz}
                    className="w-full bg-blue-500 text-white py-2 rounded-md"
                    disabled={
                      Object.keys(userAnswers).length !== quizQuestions.length
                    }
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            )}
            <button
              onClick={() => {
                setShowQuiz(false);
                setQuizQuestions([]);
                setUserAnswers({});
                setQuizSubmitted(false);
              }}
              className="w-full bg-gray-500 text-white py-2 rounded-md"
            >
              Close Quiz
            </button>
          </div>
        </div>
      )}

      {quizSubmitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-semibold mb-4">Quiz Results</h2>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span>Score:</span>
                <span className="font-bold">{`${
                  Object.values(userAnswers).filter(
                    (answer, index) =>
                      answer === quizQuestions[index].correctAnswer
                  ).length
                } / ${quizQuestions.length}`}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{
                    width: `${
                      (Object.values(userAnswers).filter(
                        (answer, index) =>
                          answer === quizQuestions[index].correctAnswer
                      ).length /
                        quizQuestions.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="space-y-4">
              {quizQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg ${
                    userAnswers[idx] === q.correctAnswer
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <p className="font-medium mb-2">{q.question}</p>
                  <p className="text-sm">
                    Your answer:{" "}
                    <span
                      className={
                        userAnswers[idx] === q.correctAnswer
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {userAnswers[idx]}
                    </span>
                  </p>
                  {userAnswers[idx] !== q.correctAnswer && (
                    <p className="text-sm text-green-600">
                      Correct answer: {q.correctAnswer}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setShowQuiz(false);
                setQuizQuestions([]);
                setUserAnswers({});
                setQuizSubmitted(false);
              }}
              className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
            >
              Close Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainComponent;