import FileUploader from "./FileUploader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <FileUploader />
    </main>
  );
}

console.log(123);
console.log(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS);