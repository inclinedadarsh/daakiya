import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { urlAtom, responseAtom, isLoadingAtom } from "./lib/atoms";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";

function App() {
  const [url, setUrl] = useAtom(urlAtom);
  const [response, setResponse] = useAtom(responseAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  const handleClick = async () => {
    // TODO: Add logic to fetch request and render loading
  };

  return (
    <main className='min-h-screen max-w-3xl mx-auto flex justify-center items-center gap-4 flex-col'>
      <div className='flex justify-center items-end gap-4 w-full'>
        <div className='grow'>
          <Label htmlFor='url'>Input URL</Label>
          <Input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            id='url'
            className='mt-2'
          />
        </div>
        <Button className='w-36' onClick={handleClick} disabled={isLoading}>
          {isLoading ? <Loader2 className='animate-spin' /> : "Send Request"}
        </Button>
      </div>
      <p className='w-full min-h-40 border border-border rounded-md'>
        {response}
      </p>
    </main>
  );
}

export default App;
