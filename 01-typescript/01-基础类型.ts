// -------- 1. 原始类型 --------
const username: string = "张三";
const age: number = 25;
const isStudent: boolean = true;
const nothing: null = null;
const notDefined: undefined = undefined;

console.log("========== 原始类型 ==========");
console.log(`用户名(string): ${username}`);
console.log(`年龄(number): ${age}`);
console.log(`是否学生(boolean): ${isStudent}`);
console.log(`空值(null): ${nothing}`);
console.log(`未定义(undefined): ${notDefined}`);

// -------- 2. 数组类型 --------
const scores: number[] = [90, 85, 92];
const names: Array<string> = ["李四", "王五"];  // 泛型写法
// 元组 - 固定长度和类型的数组
const person: [string, number] = ["赵六", 30];

console.log("\n========== 数组与元组 ==========");
console.log(`数字数组: ${scores}`);
console.log(`字符串数组: ${names}`);
console.log(`元组 [string, number]: 姓名=${person[0]}, 年龄=${person[1]}`);

// -------- 3. 对象类型 --------
interface User {
  name: string;
  age: number;
  email?: string; // 可选属性
}

const user: User = {
  name: "周丰林",
  age: 20,
};

console.log("\n========== 对象类型 ==========");
console.log(`用户: ${JSON.stringify(user)}`);

// -------- 4. 函数类型 --------
// 参数和返回值类型注解
function add(a: number, b: number): number {
  return a + b;
}

// 箭头函数类型
const greet: (name: string) => string = (name) => {
  return `你好, ${name}!`;
};

// 可选参数与默认值
function log(message: string, level: string = "info"): void {
  console.log(`[${level.toUpperCase()}] ${message}`);
}

console.log("\n========== 函数类型 ==========");
console.log(`add(3, 5) = ${add(3, 5)}`);
console.log(greet("世界"));
log("这是一条日志");

// -------- 5. any 与 unknown --------
let flexible: any = "可以是任何类型";
flexible = 123;
flexible = true;

let uncertain: unknown = "未知类型";
// 使用 unknown 需要先做类型检查
if (typeof uncertain === "string") {
  console.log(`\nunknown 类型检查后: ${uncertain.toUpperCase()}`);
}

// -------- 6. void 与 never --------
function doNothing(): void {
  // 没有返回值
}

function throwError(message: string): never {
  throw new Error(message);
}

console.log("\n========== 基础类型学习完毕 ==========");
