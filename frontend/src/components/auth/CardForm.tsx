import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface CardFormProps {
    title: string;
    description: string;
    hyperlinkText: string;
    linkTo: string;
    children: React.ReactNode;
}

export default function CardForm({ title, description, hyperlinkText, linkTo, children }: CardFormProps) {

    return (
        <Card className="w-100 h-min">
            <CardHeader>
                <CardTitle className="text-3xl font-extrabold tracking-tight font-mono">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className="flex flex-col">
                <Button variant="link" className="w-full">
                    <Link to={`/${linkTo}`}>{hyperlinkText}</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}