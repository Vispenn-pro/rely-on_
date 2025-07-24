import { KanbanPreviewType, KanbanType } from "./types";

export const sampleKanbanPreviewMockDatas: KanbanPreviewType[] = [
    {
        id: "kanban-1",
        name: "Project Management",
        lastActivity: new Date().toISOString(),
    },
    {
        id: "kanban-2",
        name: "Marketing Campaign",
        lastActivity: new Date().toISOString(),
    },
    {
        id: "kanban-3",
        name: "Product Development",
        lastActivity: new Date().toISOString(),
    },
]

export const sampleKanbansMock: KanbanType[] = [
  {
    id: "kanban-1",
    name: "Project Management",
    lastActivity: new Date().toISOString(),
    columns: [
      { id: "col-1", name: "Backlog" },
      { id: "col-2", name: "To Do" },
      { id: "col-3", name: "In Progress" },
      { id: "col-4", name: "Review" },
      { id: "col-5", name: "Done" },
    ],
    items: [
      { id: "item-1", title: "Set up project repo", description: "Initialize git and create repo", columnId: "col-1" },
      { id: "item-2", title: "Define data models", description: "Create KanbanType and related types", columnId: "col-1" },

      { id: "item-3", title: "Design UI wireframes", description: "Sketch main screens and interactions", columnId: "col-2" },
      { id: "item-4", title: "Implement drag and drop", description: "Use dnd-kit for drag and drop support", columnId: "col-2" },
      { id: "item-5", title: "Set up state management", description: "Manage columns and items state", columnId: "col-2" },

      { id: "item-6", title: "Build Kanban columns", description: "Render columns and handle drag events", columnId: "col-3" },
      { id: "item-7", title: "Build Kanban items", description: "Render items and handle drag events", columnId: "col-3" },
      { id: "item-8", title: "Test drag & drop", description: "Verify column and item reordering works", columnId: "col-3" },

      { id: "item-9", title: "Code review", description: "Peer review all recent commits", columnId: "col-4" },
      { id: "item-10", title: "Fix review comments", description: "Resolve issues found during review", columnId: "col-4" },

      { id: "item-11", title: "Deploy to staging", description: "Deploy latest build to staging server", columnId: "col-5" },
      { id: "item-12", title: "User acceptance testing", description: "Run acceptance tests with stakeholders", columnId: "col-5" },
      { id: "item-13", title: "Release to production", description: "Deploy final version live", columnId: "col-5" },
    ],
  },

  {
    id: "kanban-2",
    name: "Marketing Campaign",
    lastActivity: new Date().toISOString(),
    columns: [
      { id: "col-21", name: "Ideas" },
      { id: "col-22", name: "Planning" },
      { id: "col-23", name: "Execution" },
      { id: "col-24", name: "Analysis" },
      { id: "col-25", name: "Completed" },
    ],
    items: [
      { id: "item-21", title: "Brainstorm topics", description: "Collect all marketing ideas", columnId: "col-21" },
      { id: "item-22", title: "Research audience", description: "Analyze target demographics", columnId: "col-21" },

      { id: "item-23", title: "Create calendar", description: "Plan timeline for campaign", columnId: "col-22" },
      { id: "item-24", title: "Budget approval", description: "Get budget signed off", columnId: "col-22" },

      { id: "item-25", title: "Design ads", description: "Create visuals and copy", columnId: "col-23" },
      { id: "item-26", title: "Launch campaign", description: "Start campaign across channels", columnId: "col-23" },

      { id: "item-27", title: "Collect feedback", description: "Gather data from users", columnId: "col-24" },
      { id: "item-28", title: "Analyze results", description: "Review KPIs and ROI", columnId: "col-24" },

      { id: "item-29", title: "Archive campaign", description: "Store assets and reports", columnId: "col-25" },
    ],
  },

  {
    id: "kanban-3",
    name: "Product Development",
    lastActivity: new Date().toISOString(),
    columns: [
      { id: "col-31", name: "Research" },
      { id: "col-32", name: "Design" },
      { id: "col-33", name: "Development" },
      { id: "col-34", name: "Testing" },
      { id: "col-35", name: "Launch" },
      { id: "col-36", name: "Maintenance" },
    ],
    items: [
      { id: "item-31", title: "Market analysis", description: "Identify user needs and competitors", columnId: "col-31" },
      { id: "item-32", title: "Technical feasibility", description: "Assess technical challenges", columnId: "col-31" },

      { id: "item-33", title: "Create wireframes", description: "Design initial layouts", columnId: "col-32" },
      { id: "item-34", title: "Define UX flows", description: "Map user journeys", columnId: "col-32" },

      { id: "item-35", title: "Implement features", description: "Develop core product", columnId: "col-33" },
      { id: "item-36", title: "Integrate APIs", description: "Connect external services", columnId: "col-33" },
      { id: "item-37", title: "Setup database", description: "Design and deploy DB schema", columnId: "col-33" },

      { id: "item-38", title: "Unit testing", description: "Write and run unit tests", columnId: "col-34" },
      { id: "item-39", title: "Bug fixes", description: "Fix bugs from testing", columnId: "col-34" },

      { id: "item-40", title: "Release candidate", description: "Prepare launch version", columnId: "col-35" },

      { id: "item-41", title: "Monitor performance", description: "Track app health post-launch", columnId: "col-36" },
      { id: "item-42", title: "Patch updates", description: "Fix issues and update features", columnId: "col-36" },
    ],
  },
]
