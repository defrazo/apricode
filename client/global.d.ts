declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.png" {
    const content: any;
    export default content;
}
