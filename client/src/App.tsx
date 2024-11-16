import axios from "axios";
import { z } from "zod";
import { toast } from "sonner";
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

  const urlSchema = z.string().url();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      urlSchema.parse(url);
      if (url === "") {
        toast.error("Please enter a valid url!");
        return;
      }
      const responseData = await axios.post("http://127.0.0.1:8000/url", {
        url: url,
      });
      setResponse(responseData.data.response);
      console.log(responseData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Input is not a valid URL!");
      } else if (axios.isAxiosError(error)) {
        console.error("Axios Error: ", error.response?.data || error.message);
        toast.error("An error occurred during the request.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
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
      <p className='w-full h-40 border border-border rounded-md overflow-scroll'>
        {response}
      </p>
    </main>
  );
}

export default App;
