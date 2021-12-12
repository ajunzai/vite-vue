function identity(value: Number): Number {
  return value
}
interface Identities<V, M> {
  value: V,
  message: M
}
function Identity<T,U>(value: T, message: U):Identities<T, U> {
  console.log(message)
  return {value, message}
}

const a = Identity<Number[], string>([1,2], 'XJ') // 1

//* T 为变量类型(Type)
//* K 对象的键类型（Key）
//* V 对象的值类型 (Value)
//* E 元素类型 (Element)

//* 编译器不会知道类型变量是否存在某个属性，除非我们显式的将属性定义为类型变量
//* 让类型变量extends一个含有我们所需属性的接口  属于一种限制
interface Length {
  length: number
}
function discriminate<T extends Length>(arg: T): T {
  console.log(arg.length)
  return arg
}
// discriminate(6)
function discriminate1<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}

//* ## 泛型约束  keyof
// 获得变量类型的所有键组成的联合类型

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

//* ## 泛型条件类型 extends
// 通常会结合infer关键字，实现类型抽取
// T extends U ? X : Y
interface Dictionary<T = any> {
  [key: string]: T
}

type strDict = Dictionary<string>

type DictMember<T> = T extends Dictionary<infer V> ? V : never
type StrDicMember = DictMember<strDict>

// 泛型基础
// 索引类型 & 映射类型
// 条件类型 & 分布式条件类型
// infer 关键字
// 类型守卫 与 is、 in 关键字
// 内置工具类型原理
// 内置工具类型的增强

//* 索引签名
interface Foo {
  [keys: string]: string
}

//* 映射类型
interface A {
  a: boolean;
  b: string
  c: number
  d: () => void
}

type StringifyA<T> = {
  [K in keyof T]: string
}

//* 条件类型
// T extends U ? X : Y
function pickSingleValue<T extends object, U extends keyof T>(
  obj: T,
  key: U
): T[U] {
  return obj[key]
}
//* T extends object都是泛型约束，将T约束为对象类型  目的为收窄类型约束

declare function strOrNum<T extends boolean>(
  x: T
): T extends true ? string: number

// * 分布式条件类型
// 对于属于裸类型参数的检查类型，条件类型会在实例化时期自动分发到联合类型上

// * infer 关键字

type RetrunTypeFake1<T extends (...args: any) => any> =
  T extends (...args: any) => infer R ? R : never

// * 类型守卫 与 is、 in 关键字

//! export const isString = (arg: unknown): boolean => typeof arg === 'string'

function useIt(numOrStr: number | string) {
  if (isString(numOrStr)) {
    console.log(numOrStr.length)
  }
}
// 可以用is关键字 缩小返回值
export const isString = (arg: unknown): arg is string => typeof arg === 'string'

export type Falsy = false | '' | 0 | null | undefined

export const isFalsy = (val: unknown): val is Falsy => !val

// 可以用in关键字判断是那个值
interface ILogInUserProps {
  isLogin: boolean;
  name: string;
}

interface IUnLoginUserProps {
  isLogin: boolean;
  from: string;
}

type UserProps = ILogInUserProps | IUnLoginUserProps

function getUserInfo(user: UserProps): string {
  return 'name' in user ? user.name : user.from
}

// * 提取promise的实际类型
export type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never
const foo = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    resolve('xj')
  })
}

type FooReturnType = ReturnType<typeof foo> // Promise<string>

type nakedFooReturnType = PromiseType<FooReturnType> // string

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// ! 泛型工具
// 属性变可选
type PartialFake<T> = {
  [P in keyof T]?: T[P]
}

// 属性转换为某个类型  keyof any 对应的类型为 number | string | symbol
type Record<K extends keyof any, T> = {
  [P in K]: T
}

// 提取T类型中部分元素
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// 去除T和U的交集
type Exclude<T, U> = T extends U ? never : T

// Omit适用于键值对的exclude
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

// 获取T类型对应的返回值
type ReturnTypeFake<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any