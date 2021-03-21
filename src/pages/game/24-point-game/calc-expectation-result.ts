enum Expressions {
  /// <summary>
  /// 加法(a+b)
  /// </summary>
  Addition,

  /// <summary>
  /// 减法(a-b)
  /// </summary>
  Subtraction,

  /// <summary>
  /// 减法(b-a)
  /// </summary>
  NSubtraction,

  /// <summary>
  /// 乘法(a*b)
  /// </summary>
  Multiplication,

  /// <summary>
  /// 除法(a/b)
  /// </summary>
  Division,

  /// <summary>
  /// 除法(b/a)
  /// </summary>
  NDivision,
}
class ExpressionOperator {
  /// <summary>
  /// Gets the number left.
  /// </summary>
  /// <value>
  /// The number left.
  /// </value>
  public get Num_left() {
    switch (this._expression) {
      case Expressions.NDivision:
      case Expressions.NSubtraction:
        return this._b;
      default:
        return this._a;
    }
  }

  /// <summary>
  /// Gets the number right.
  /// </summary>
  /// <value>
  /// The number right.
  /// </value>
  public get Num_right() {
    switch (this._expression) {
      case Expressions.NDivision:
      case Expressions.NSubtraction:
        return this._a;
      default:
        return this._b;
    }
  }

  /// <summary>
  /// Gets the number b.
  /// </summary>
  /// <value>
  /// The number b.
  /// </value>
  public get Num_b() {
    return this._b;
  }

  /// <summary>
  /// Gets the number a.
  /// </summary>
  /// <value>
  /// The number a.
  /// </value>
  public get Num_a() {
    return this._a;
  }
  private readonly _a: number;
  private readonly _b: number;
  private readonly _expression: Expressions;

  /// <summary>
  /// Initializes a new instance of the <see cref="ExpressionOperator"/> class.
  /// </summary>
  /// <param name="num_a">The number a.</param>
  /// <param name="num_b">The number b.</param>
  /// <param name="expression">The expression.</param>
  constructor(numA: number, numB: number, expression: Expressions) {
    this._a = numA;
    this._b = numB;
    this._expression = expression;
  }

  /// <summary>
  /// Gets the result.
  /// </summary>
  /// <returns></returns>
  public GetResult(): number {
    switch (this._expression) {
      case Expressions.Addition:
        return this._a + this._b;
      case Expressions.Subtraction:
        return this._a - this._b;
      case Expressions.NSubtraction:
        return this._b - this._a;
      case Expressions.Multiplication:
        return this._a * this._b;
      case Expressions.Division:
        return this._b === 0 ? Number.NaN : this._a / this._b;
      case Expressions.NDivision:
        return this._a === 0 ? Number.NaN : this._b / this._a;
      default:
        return Number.NaN;
    }
  }

  /// <summary>
  /// Returns a <see cref="System.String" /> that represents this instance.
  /// </summary>
  /// <returns>
  /// A <see cref="System.String" /> that represents this instance.
  /// </returns>
  public ToString(): string {
    return `${this.FinalExpressionString()}=${this.GetResult()}`;
  }

  /// <summary>
  /// Gets the expression string.
  /// </summary>
  /// <returns></returns>
  public FinalExpressionString() {
    return this.GetExpressionString(this._a, this._b);
  }

  /// <summary>
  /// Gets the expression string.
  /// </summary>
  /// <param name="left">The left.</param>
  /// <param name="right">The right.</param>
  /// <returns></returns>
  public GetExpressionString(left: any, right: any): string {
    const lf = typeof left === 'string' ? `(${left})` : left;
    const rg = typeof right === 'string' ? `(${right})` : right;
    switch (this._expression) {
      case Expressions.Addition:
        return `${lf}+${rg}`;
      case Expressions.Subtraction:
        return `${lf}-${rg}`;
      case Expressions.NSubtraction:
        return `${rg}-${lf}`;
      case Expressions.Multiplication:
        return `${lf}*${rg}`;
      case Expressions.Division:
        return `${lf}/${rg}`;
      case Expressions.NDivision:
        return `${rg}/${lf}`;
      default:
        return '';
    }
  }
}
class CardOperator {
  private readonly _cards: number[];
  private readonly _threshold: any = 0.0000001;

  constructor(cards: number[]) {
    this._cards = cards;
  }

  /// <summary>
  /// 对数组a所有可能的排列进行组合运算并返回运算的结果
  /// </summary>
  /// <param name="a"></param>
  /// <returns></returns>
  public Operate(checkResult: number) {
    const results: string[] = [];
    for (let ai = 0; ai < this._cards.length; ai += 1) {
      const a1 = this._cards[ai];
      for (let bi = 0; bi < this._cards.length; bi += 1) {
        if (bi !== ai) {
          const a2 = this._cards[bi];
          for (let ci = 0; ci < this._cards.length; ci += 1) {
            if (ci !== ai && ci !== bi) {
              const a3 = this._cards[ci];
              for (let di = 0; di < this._cards.length; di += 1) {
                if (di !== ai && di !== bi && di !== ci) {
                  const a4 = this._cards[di];
                  let tryOperate = this.OperateTwoTwo([a1, a2, a3, a4], checkResult);
                  if (tryOperate.success) {
                    if (!results.some(x => x === tryOperate.expression)) {
                      results.push(tryOperate.expression);
                    }
                  }
                  tryOperate = this.OperateTreeOne([a1, a2, a3, a4], checkResult);
                  if (tryOperate.success) {
                    if (!results.some(x => x === tryOperate.expression)) {
                      results.push(tryOperate.expression);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return {
      results,
      message: `计算完成，共有 ${results.length} 种运算方式。`,
    };
  }

  /// <summary>
  /// (a1{Exp}a2){Exp}(a3{Exp}a4)
  /// </summary>
  /// <returns></returns>
  private OperateTwoTwo(cards: number[], checkResult: number) {
    const a12: ExpressionOperator[] = this.Operates(cards[0], cards[1]);
    const a34: ExpressionOperator[] = this.Operates(cards[2], cards[3]);
    for (const a of a12) {
      for (const b of a34) {
        const ab: ExpressionOperator[] = this.Operates(a.GetResult(), b.GetResult());
        for (const h of ab) {
          if (Math.abs(h.GetResult() - checkResult) < this._threshold) {
            return {
              expression: `${h.GetExpressionString(
                a.FinalExpressionString(),
                b.FinalExpressionString()
              )} = ${h.GetResult()}`,
              success: true,
            };
          }
        }
      }
    }
    return {
      expression: '',
      success: false,
    };
  }

  /// <summary>
  /// (a1{Exp}a2{Exp}a3){Exp}a4
  /// </summary>
  /// <returns></returns>
  private OperateTreeOne(cards: number[], checkResult: number) {
    const a12: ExpressionOperator[] = this.Operates(cards[0], cards[1]); // (a1{Exp}a2{Exp}a3){Exp}a4
    for (const a of a12) {
      const a123: ExpressionOperator[] = this.Operates(a.GetResult(), cards[2]);
      for (const b of a123) {
        const ab: ExpressionOperator[] = this.Operates(b.GetResult(), cards[3]);
        for (const c of ab) {
          if (Math.abs(c.GetResult() - checkResult) < this._threshold) {
            return {
              expression: `${c.GetExpressionString(
                b.GetExpressionString(a.FinalExpressionString(), b.Num_b),
                cards[3]
              )} = ${c.GetResult()}`,
              success: true,
            };
          }
        }
      }
    }
    return {
      expression: '',
      success: false,
    };
  }

  /// <summary>
  /// 运算两个数的四则运算并将结果作为一个数组返回
  /// </summary>
  /// <param name="num_a">The number a.</param>
  /// <param name="num_b">The number b.</param>
  /// <returns></returns>
  private Operates(numA: number, numB: number): ExpressionOperator[] {
    return [
      new ExpressionOperator(numA, numB, Expressions.Addition),
      new ExpressionOperator(numA, numB, Expressions.Subtraction),
      new ExpressionOperator(numA, numB, Expressions.NSubtraction),
      new ExpressionOperator(numA, numB, Expressions.Multiplication),
      new ExpressionOperator(numA, numB, Expressions.Division),
      new ExpressionOperator(numA, numB, Expressions.NDivision),
    ];
  }
}

export function calcExpectationResult(nums: number[], expectation = 24) {
    return new CardOperator(nums).Operate(expectation);
}
