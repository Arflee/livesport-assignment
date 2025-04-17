import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Avatar, AvatarImage } from "./avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import clsx from "clsx";
import { Suspense } from "react";

interface CardDetailsProps {
  className?: string;
  href?: string;
  avatarSrc: string;
  alt: string;
  title: string;
  description: string;
}

export default async function CardDetails({
  className,
  avatarSrc,
  alt,
  title,
  description,
}: CardDetailsProps) {

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Card className={clsx("cursor-pointer", className)}>
            <CardHeader className="flex items-center">
              <Suspense fallback={<p>loading...</p>}>

              <Avatar className="w-auto h-auto max-w-[100px]">
                <AvatarImage src={avatarSrc} alt={alt} width={100} height={100}/>
              </Avatar>
              </Suspense>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
