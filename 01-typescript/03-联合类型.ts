// -------- 1. 基本联合类型 --------
// 一个值可以是多种类型之一
type ID = string | number;

function printID(id: ID): void {
  // 需要使用类型缩小来确定具体类型
  if (typeof id === "string") {
    console.log(`ID(字符串): ${id.toUpperCase()}`);
  } else {
    console.log(`ID(数字): ${id.toFixed(0)}`);
  }
}

console.log("========== 基本联合类型 ==========");
printID("abc123");
printID(10086);

// -------- 2. 联合类型数组 --------
type Result = string | number;
const mixedArray: Result[] = ["hello", 123, "world", 456];
// 等价于 Array<string | number>

console.log("\n========== 联合类型数组 ==========");
console.log(`混合数组: ${mixedArray}`);

// -------- 3. 类型缩小 (Type Narrowing) --------
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function getArea(shape: Shape): number {
  // 通过 kind 属性缩小类型 —— 这就是"可辨识联合"
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

console.log("\n========== 可辨识联合 (Discriminated Union) ==========");
const circle: Shape = { kind: "circle", radius: 5 };
const rect: Shape = { kind: "rectangle", width: 10, height: 8 };
const tri: Shape = { kind: "triangle", base: 6, height: 4 };

console.log(`圆形面积: ${getArea(circle).toFixed(2)}`);
console.log(`矩形面积: ${getArea(rect)}`);
console.log(`三角形面积: ${getArea(tri)}`);

// -------- 4. 联合类型与函数重载 --------
function processValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    return `字符串值: "${value}"`;
  } else if (typeof value === "number") {
    return `数字值: ${value * 2}`;
  } else {
    return `布尔值: ${value ? "是" : "否"}`;
  }
}

console.log("\n========== 联合类型函数 ==========");
console.log(processValue("hello"));
console.log(processValue(42));
console.log(processValue(true));

// -------- 5. 实际应用：API 响应类型 --------
type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string }
  | { status: "loading" };

function handleApiResponse<T>(response: ApiResponse<T>): string {
  switch (response.status) {
    case "success":
      return `✅ 成功: ${JSON.stringify(response.data)}`;
    case "error":
      return `❌ 错误: ${response.message}`;
    case "loading":
      return `⏳ 加载中...`;
  }
}

console.log("\n========== API 响应联合类型 ==========");
console.log(handleApiResponse({ status: "success", data: { id: 1, name: "用户A" } }));
console.log(handleApiResponse({ status: "error", message: "网络错误" }));
console.log(handleApiResponse({ status: "loading" }));

console.log("\n========== 联合类型学习完毕 ==========");
