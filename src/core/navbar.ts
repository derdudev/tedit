import Bar, { BarConfig } from "./bar";

class NavbarConfig implements BarConfig{

}

class Navbar extends Bar{
    protected config: NavbarConfig;

    public load(config: NavbarConfig): void {
        this.config = config;
    }
}

export default Navbar;
export {NavbarConfig}