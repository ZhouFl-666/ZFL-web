// -------- 练习1：任务管理系统类型定义 --------
console.log("========== 练习1：任务管理系统 ==========");

type TaskStatus = "待办" | "进行中" | "已完成";  // 字面量类型
type TaskPriority = 1 | 2 | 3;                    // 数字字面量

type Task = {
  id: string | number;      // 联合类型
  title: string;
  status: TaskStatus;       // 字面量类型别名
  priority: TaskPriority;
};

// 使用类型别名定义回调
type TaskFilter = (task: Task) => boolean;

const tasks: Task[] = [
  { id: 1, title: "学习TypeScript", status: "已完成", priority: 1 },
  { id: 2, title: "学习Antd", status: "进行中", priority: 1 },
  { id: 3, title: "学习Less", status: "待办", priority: 2 },
  { id: 4, title: "综合练习", status: "待办", priority: 2 },
];

// 类型断言：从 JSON 数据断言
const rawData: unknown = tasks;
const taskList = rawData as Task[];

const highPriorityFilter: TaskFilter = (task) => task.priority === 1;
const highPriorityTasks = taskList.filter(highPriorityFilter);

console.log("高优先级任务:");
highPriorityTasks.forEach((t) => console.log(`  [${t.status}] ${t.title}`));

// -------- 练习2：API 请求封装 --------
console.log("\n========== 练习2：API 请求封装 ==========");

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestConfig = {
  url: string;
  method: HttpMethod;
  data?: unknown;
};

type ApiResult<T> =
  | { code: 200; data: T; message: "success" }
  | { code: 400 | 401 | 403; data: null; message: string }
  | { code: 500; data: null; message: "服务器内部错误" };

// 模拟 API 请求
function mockRequest<T>(config: RequestConfig): ApiResult<T> {
  console.log(`[${config.method}] ${config.url}`);

  if (config.url === "/api/login") {
    const { username, password } = config.data as { username: string; password: string };
    if (username === "admin" && password === "123456") {
      return {
        code: 200,
        data: { token: "abc123", username: "admin" } as unknown as T,
        message: "success",
      };
    }
    return { code: 401, data: null, message: "用户名或密码错误" };
  }

  return { code: 500, data: null, message: "服务器内部错误" };
}

const loginResult = mockRequest<{ token: string; username: string }>({
  url: "/api/login",
  method: "POST",
  data: { username: "admin", password: "123456" },
});

// 使用类型缩小处理响应
if (loginResult.code === 200) {
  console.log(`✅ 登录成功: ${loginResult.data.username}, token=${loginResult.data.token}`);
} else {
  console.log(`❌ 登录失败: ${loginResult.message}`);
}

// -------- 练习3：事件处理类型 --------
console.log("\n========== 练习3：事件处理类型 ==========");

type EventType = "click" | "submit" | "change"; // 字面量联合类型
type EventHandler = (event: { type: EventType; target: string }) => void;

const handlers: Record<EventType, EventHandler> = {
  click: (e) => console.log(`点击了: ${e.target}`),
  submit: (e) => console.log(`提交了表单: ${e.target}`),
  change: (e) => console.log(`改变了: ${e.target}`),
};

// 类型断言确保类型安全
const eventType = "click" as EventType;
handlers[eventType]({ type: eventType, target: "登录按钮" });

console.log("\n========== 综合练习完毕 ==========");
console.log("\n🎉 TypeScript 核心知识已全部掌握！");
console.log("   - ✅ 基础类型");
console.log("   - ✅ 字面量类型");
console.log("   - ✅ 联合类型");
console.log("   - ✅ 类型断言");
console.log("   - ✅ 类型别名");
