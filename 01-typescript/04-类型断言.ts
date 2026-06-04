// -------- 1. as 语法 (推荐) --------
// 告诉编译器"我知道这个值的类型"

// 场景：获取 DOM 元素
const myCanvas = { id: "main-canvas", width: 800, height: 600 } as HTMLElement;

// 场景：更具体的类型
const someValue: unknown = "Hello TypeScript";
const strLength: number = (someValue as string).length;

console.log("========== as 语法 ==========");
console.log(`字符串长度: ${strLength}`);

// -------- 2. 类型断言的限制 --------
// 只有"更具体"或"更宽泛"的断言才被允许
const num = 42;
// const str = num as string;  // ❌ 错误：number 和 string 没有重叠

// 正确做法：先转为 unknown
const str = num as unknown as string; // 双重断言（不推荐，但有时必要）
console.log(`双重断言 number->unknown->string: "${str}"`);

// -------- 3. 非空断言 (!) --------
// 告诉编译器"这个值不可能为 null 或 undefined"

function getUsername(id: number): string | null {
  if (id === 1) return "admin";
  return null;
}

// 当我们确定返回值不为 null 时使用 !
const userName: string = getUsername(1)!;
console.log("\n========== 非空断言 ==========");
console.log(`用户名(非空断言): ${userName}`);

// DOM 场景中的非空断言
const appElement = { innerHTML: "" } as HTMLElement;
appElement!.innerHTML = "Hello"; // 确定元素存在

// -------- 4. 类型断言在类与接口中的使用 --------
interface Cat {
  name: string;
  meow(): string;
}

interface Dog {
  name: string;
  bark(): string;
}

// 使用类型断言处理联合类型
function handleAnimal(animal: Cat | Dog): string {
  if ("meow" in animal) {
    // 这里 TS 已经通过 in 运算符缩小了类型
    return (animal as Cat).meow();
  }
  return (animal as Dog).bark();
}

const kitty: Cat = { name: "小花", meow: () => "喵喵喵!" };
const puppy: Dog = { name: "旺财", bark: () => "汪汪汪!" };

console.log("\n========== 接口类型断言 ==========");
console.log(`小猫: ${handleAnimal(kitty)}`);
console.log(`小狗: ${handleAnimal(puppy)}`);

// -------- 5. 实际应用：JSON 数据断言 --------
interface UserData {
  id: number;
  name: string;
  email: string;
}

// 从 API 获取的数据类型是 any/unknown
const apiResponse: unknown = {
  id: 1,
  name: "周丰林",
  email: "zfl@example.com",
  extra: "额外字段",
};

// 断言为具体类型
const userData = apiResponse as UserData;
console.log("\n========== JSON 数据断言 ==========");
console.log(`用户: ${userData.name}, 邮箱: ${userData.email}`);

// -------- 6. as const 断言 --------
// 将值断言为最精确的字面量类型（只读）
const theme = {
  primary: "#1890ff",
  success: "#52c41a",
} as const;

// theme.primary = "#fff";  // ❌ 只读属性不能修改

console.log("\n========== as const 断言 ==========");
console.log(`主题色: ${theme.primary} (类型为字面量 "#1890ff")`);

console.log("\n========== 类型断言学习完毕 ==========");
