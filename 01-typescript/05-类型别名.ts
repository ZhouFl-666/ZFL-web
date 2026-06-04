// -------- 1. 基本类型别名 --------
// 给类型起一个新名字，使代码更语义化
type UserID = string | number;
type UserName = string;
type Age = number;

interface UserInfo {
  id: UserID;
  name: UserName;
  age: Age;
}

const user: UserInfo = {
  id: "u_001",
  name: "周丰林",
  age: 20,
};

console.log("========== 基本类型别名 ==========");
console.log(`用户: ${JSON.stringify(user)}`);

// -------- 2. 函数类型别名 --------
type MathFunc = (a: number, b: number) => number;
type Callback<T> = (data: T) => void;
type Predicate<T> = (item: T) => boolean;

const multiply: MathFunc = (a, b) => a * b;
const logData: Callback<string> = (data) => console.log(`回调输出: ${data}`);
const isEven: Predicate<number> = (n) => n % 2 === 0;

console.log("\n========== 函数类型别名 ==========");
console.log(`multiply(6, 7) = ${multiply(6, 7)}`);
logData("Hello Callback");
console.log(`isEven(10) = ${isEven(10)}, isEven(7) = ${isEven(7)}`);

// -------- 3. 对象类型别名 --------
type Point = { x: number; y: number };
type Size = { width: number; height: number };
// 组合类型别名
type Rect = Point & Size; // 交叉类型

const rect: Rect = {
  x: 10,
  y: 20,
  width: 100,
  height: 50,
};

console.log("\n========== 对象类型别名 ==========");
console.log(`矩形: x=${rect.x}, y=${rect.y}, 宽=${rect.width}, 高=${rect.height}`);

// -------- 4. 联合类型别名 --------
type Status = "idle" | "loading" | "success" | "error";
type HttpCode = 200 | 301 | 400 | 401 | 403 | 404 | 500;

function checkStatus(status: Status, code: HttpCode): string {
  return `状态: ${status}, HTTP码: ${code}`;
}

console.log("\n========== 联合类型别名 ==========");
console.log(checkStatus("success", 200));
console.log(checkStatus("error", 500));

// -------- 5. 泛型类型别名 --------
type List<T> = T[];
type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E };
type Tree<T> = { value: T; children: Tree<T>[] };

const numberList: List<number> = [1, 2, 3, 4, 5];
const stringList: List<string> = ["a", "b", "c"];

function processResult(result: Result<number>): string {
  if (result.ok) {
    return `成功: ${result.value}`;
  }
  return `失败: ${result.error}`;
}

console.log("\n========== 泛型类型别名 ==========");
console.log(`数字列表: ${numberList}`);
console.log(`字符串列表: ${stringList}`);
console.log(processResult({ ok: true, value: 42 }));
console.log(processResult({ ok: false, error: "数据不存在" }));

// -------- 6. 实际应用：表单配置类型 --------
type InputType = "text" | "password" | "number" | "email";
type Rule = { required?: boolean; min?: number; max?: number; pattern?: RegExp };

type FormField = {
  name: string;
  label: string;
  type: InputType;
  placeholder?: string;
  rules: Rule[];
};

type FormConfig = FormField[];

const loginForm: FormConfig = [
  {
    name: "username",
    label: "用户名",
    type: "text",
    placeholder: "请输入用户名",
    rules: [{ required: true, min: 3, max: 20 }],
  },
  {
    name: "password",
    label: "密码",
    type: "password",
    placeholder: "请输入密码",
    rules: [{ required: true, min: 6 }],
  },
];

console.log("\n========== 表单配置类型（实战） ==========");
loginForm.forEach((field) => {
  console.log(`字段: ${field.label} (${field.type})`);
  console.log(`  规则: ${JSON.stringify(field.rules)}`);
});

console.log("\n========== 类型别名学习完毕 ==========");
