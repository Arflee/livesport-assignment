import clsx from "clsx";

export default function Input({className, placeholder, ...props}: React.HTMLProps<HTMLInputElement>) {
    return (
        <input className={clsx(className)} {...props} placeholder={placeholder} />
    )
}