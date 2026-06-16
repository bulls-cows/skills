/**
 * 目标状态管理脚本
 * 用于创建、更新、查询目标和任务状态
 */

import * as fs from 'fs';
import * as path from 'path';

interface Task {
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  dependencies?: string[];
  blockedReason?: string;
}

interface Goal {
  name: string;
  description: string;
  criteria: string;
  deadline?: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'cancelled';
  progress: number;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

const DATA_FILE = path.join(__dirname, 'goals.json');

function loadGoals(): Goal[] {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

function saveGoals(goals: Goal[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(goals, null, 2));
}

export function createGoal(
  name: string,
  description: string,
  criteria: string,
  deadline?: string
): Goal {
  const goals = loadGoals();
  const now = new Date().toISOString();

  const newGoal: Goal = {
    name,
    description,
    criteria,
    deadline,
    status: 'not_started',
    progress: 0,
    tasks: [],
    createdAt: now,
    updatedAt: now,
  };

  goals.push(newGoal);
  saveGoals(goals);
  return newGoal;
}

export function addTask(
  goalName: string,
  taskName: string,
  dependencies?: string[]
): Task | null {
  const goals = loadGoals();
  const goal = goals.find(g => g.name === goalName);

  if (!goal) {
    return null;
  }

  const newTask: Task = {
    name: taskName,
    status: 'pending',
    dependencies,
  };

  goal.tasks.push(newTask);
  goal.updatedAt = new Date().toISOString();
  saveGoals(goals);
  return newTask;
}

export function updateTaskStatus(
  goalName: string,
  taskName: string,
  status: Task['status'],
  blockedReason?: string
): boolean {
  const goals = loadGoals();
  const goal = goals.find(g => g.name === goalName);

  if (!goal) {
    return false;
  }

  const task = goal.tasks.find(t => t.name === taskName);
  if (!task) {
    return false;
  }

  task.status = status;
  if (blockedReason) {
    task.blockedReason = blockedReason;
  }

  // 更新目标进度
  const completedTasks = goal.tasks.filter(t => t.status === 'completed').length;
  goal.progress = Math.round((completedTasks / goal.tasks.length) * 100);

  // 更新目标状态
  if (goal.progress === 100) {
    goal.status = 'completed';
  } else if (goal.progress > 0) {
    goal.status = 'in_progress';
  }

  goal.updatedAt = new Date().toISOString();
  saveGoals(goals);
  return true;
}

export function getGoal(goalName: string): Goal | null {
  const goals = loadGoals();
  return goals.find(g => g.name === goalName) || null;
}

export function listGoals(): Goal[] {
  return loadGoals();
}

export function generateReport(goalName?: string): string {
  const goals = goalName ? [getGoal(goalName)].filter(Boolean) as Goal[] : loadGoals();

  if (goals.length === 0) {
    return '未找到目标';
  }

  let report = '目标追踪摘要\n============\n\n';

  for (const goal of goals) {
    report += `目标：${goal.name}\n`;
    report += `描述：${goal.description}\n`;
    report += `状态：${goal.status}\n`;
    report += `进度：${goal.progress}%\n`;
    if (goal.deadline) {
      report += `截止时间：${goal.deadline}\n`;
    }
    report += '\n任务清单：\n';

    for (const task of goal.tasks) {
      report += `- ${task.name} [${task.status}]`;
      if (task.blockedReason) {
        report += ` (阻塞原因: ${task.blockedReason})`;
      }
      report += '\n';
    }

    report += '\n';
  }

  return report;
}

// CLI 支持
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'create':
      const [name, desc, criteria, deadline] = args.slice(1);
      createGoal(name, desc, criteria, deadline);
      console.log(`目标 "${name}" 已创建`);
      break;
      
    case 'add-task':
      const [goalName, taskName] = args.slice(1);
      addTask(goalName, taskName);
      console.log(`任务 "${taskName}" 已添加到目标 "${goalName}"`);
      break;
      
    case 'update-task':
      const [gName, tName, status] = args.slice(1);
      updateTaskStatus(gName, tName, status as Task['status']);
      console.log(`任务 "${tName}" 状态已更新为 "${status}"`);
      break;
      
    case 'report':
      const reportGoalName = args[1];
      console.log(generateReport(reportGoalName));
      break;
      
    case 'list':
      const goals = listGoals();
      console.log('所有目标：');
      for (const g of goals) {
        console.log(`- ${g.name} (${g.status}) - ${g.progress}%`);
      }
      break;
      
    default:
      console.log('用法:');
      console.log('  goal-tracker create <name> <description> <criteria> [deadline]');
      console.log('  goal-tracker add-task <goalName> <taskName>');
      console.log('  goal-tracker update-task <goalName> <taskName> <status>');
      console.log('  goal-tracker report [goalName]');
      console.log('  goal-tracker list');
  }
}
