// -------- 1. 字符串字面量类型 --------
// 将变量的值限定为特定的几个字符串之一
type Direction = "上" | "下" | "左" | "右";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type Status = "success" | "error" | "loading";

function move(direction: Direction): void {
  console.log(`向${direction}移动`);
}

function request(url: string, method: HttpMethod): void {
  console.log(`[${method}] 请求: ${url}`);
}

console.log("========== 字符串字面量类型 ==========");
move("上");
move("左");
// move("前");  // ❌ 编译错误：类型"前"不能赋值给类型Direction

request("/api/users", "GET");
request("/api/users", "POST");

// -------- 2. 数字字面量类型 --------
type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;
type HttpStatus = 200 | 404 | 500;

function rollDice(): DiceValue {
  // 返回值只能是 1-6 之一
  const value = Math.ceil(Math.random() * 6) as DiceValue;
  return value;
}

function handleResponse(code: HttpStatus): string {
  switch (code) {
    case 200: return "成功";
    case 404: return "未找到";
    case 500: return "服务器错误";
  }
}

console.log("\n========== 数字字面量类型 ==========");
console.log(`掷骰子: ${rollDice()}`);
console.log(`状态码 200: ${handleResponse(200)}`);
console.log(`状态码 404: ${handleResponse(404)}`);

// -------- 3. 布尔字面量类型 --------
type TrueOnly = true;
type FalseOnly = false;

let alwaysTrue: TrueOnly = true;
// alwaysTrue = false;  // ❌ 编译错误

console.log("\n========== 布尔字面量类型 ==========");
console.log(`alwaysTrue 只能是 true: ${alwaysTrue}`);

// -------- 4. 字面量类型的实际应用 --------
// 配置对象 - 限定可选的配置值
interface ButtonConfig {
  type: "primary" | "default" | "dashed" | "link" | "text";
  size: "small" | "middle" | "large";
  danger: boolean;
}

function createButton(config: ButtonConfig): string {
  return `创建了${config.size}大小的${config.type}按钮${config.danger ? "(危险)" : ""}`;
}

console.log("\n========== 字面量类型实战 ==========");
console.log(createButton({ type: "primary", size: "middle", danger: false }));
console.log(createButton({ type: "dashed", size: "small", danger: true }));

// -------- 5. const 断言 (as const) --------
// 让 TypeScript 推断出最精确的字面量类型
const colors = ["red", "green", "blue"] as const;
// 类型为 readonly ["red", "green", "blue"]，而不是 string[]

const config = {
  url: "https://api.example.com",
  method: "POST",
  timeout: 5000,
} as const;
// 所有属性都变成了只读的字面量类型

console.log("\n========== const 断言 ==========");
console.log(`colors 类型: readonly ["red", "green", "blue"]`);
console.log(`config.method 类型: "POST" (字面量)`);

console.log("\n========== 字面量类型学习完毕 ==========");
