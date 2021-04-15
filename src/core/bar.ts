interface BarConfig{

}

abstract class Bar{
    protected abstract config: BarConfig;

    public abstract load(config: BarConfig): void;
}

export default Bar;
export { BarConfig };