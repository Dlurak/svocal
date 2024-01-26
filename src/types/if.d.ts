export type IfElse<C extends boolean, T, U> = C extends true ? T : U;
export type Equals<T, C> = T extends C ? true : false;
export type Not<T extends boolean> = IfElse<T, false, true>;
