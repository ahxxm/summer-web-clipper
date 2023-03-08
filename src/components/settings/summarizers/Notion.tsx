import Select from "@src/components/Select";
import { SyntheticEvent } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { useQuery } from "react-query";
import { runtime } from "webextension-polyfill";
import { SettingsFormProps } from "../types";

const NotionSettings = ({ settings, dispatch }: SettingsFormProps) => {
  const { data: spaces } = useQuery("notion/spaces", async () => {
    return runtime.sendMessage({ action: "notion/getSpaces" });
  });

  const handleSelectSpace = (event: SyntheticEvent<HTMLSelectElement>) => {
    dispatch({
      type: "summarizer/notion/setSpaceId",
      payload: event.currentTarget.value,
    });
  };

  return (
    <div className="mt-2">
      <div className="flex items-end">
        <div>
          <p className="ml-1 mb-1 text-xs text-gray-400">Workspace</p>
          {spaces && (
            <Select
              id="spaceId"
              onChange={handleSelectSpace}
              defaultValue={settings.summarizers?.notion?.spaceId}
            >
              {spaces.map(({ id, name }: any) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          )}
        </div>
        <div className="flex text-sm ml-4 mb-1 underline">
          <BiLinkExternal className="w-4 h-4" />
          <a href="https://www.notion.so">Login to Notion</a>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        To use Notion AI for generating summary, you need to login to notion and
        select a workspace with AI plugin enabled. If no workspace showing up,
        try login to notion first.
      </p>
    </div>
  );
};

export default NotionSettings;