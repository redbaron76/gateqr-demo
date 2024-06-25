import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";
import { useFile } from "@/hooks/useFile";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { handleFileChange, handleSubmit, loading, file } = useFile();

  return (
    <div className="flex flex-col flex-grow items-center justify-center gap-4 bg-slate-100">
      <h1 className="text-2xl text-center font-bold">Genera Codici QR</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border border-slate-300 rounded-xl w-fit mx-4 p-4"
      >
        <div className="grid w-full items-center gap-4">
          <Label htmlFor="picture">File CSV (con intestazione)</Label>
          <Input
            id="picture"
            type="file"
            name="file"
            className="w-full"
            onChange={handleFileChange}
          />
        </div>
        <Button type="submit" disabled={!file} className="w-full">
          {loading ? "Generazione codici..." : "Carica file"}
        </Button>
      </form>
    </div>
  );
}
