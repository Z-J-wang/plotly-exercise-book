export default class AttributeController {
  private _type: string
  public get type(): string {
    return this._type
  }
  private _value: any
  public get value(): any {
    return this._value
  }

  public set value(value: any) {
    this._value = value
  }

  private _default: any
  public get default(): any {
    return this._default
  }
  private _disabled: boolean = false
  public get disabled(): boolean {
    return this._disabled
  }
  private _options: Attribute.ControllerOption[] = []
  public get options(): Attribute.ControllerOption[] {
    return this._options
  }
  private _min: number | undefined
  public get min(): number | undefined {
    return this._min
  }
  private _max: number | undefined
  public get max(): number | undefined {
    return this._max
  }
  private _step: number | undefined
  public get step(): number | undefined {
    return this._step
  }

  constructor(initial: Attribute.InitialController) {
    const { type, default: defaultValue, options, min, max, step, disabled } = initial
    this._type = type
    this._default = defaultValue
    this._value = defaultValue
    if (options) this._options = options.map((item) => ({ label: item.toString(), value: item }))
    if (min) this._min = min
    if (max) this._max = max
    if (step) this._step = step
    if (disabled) this._disabled = disabled
  }
}
