import { User } from "lucide-react";

const Persnolinfoform = ({
  data,
  onChange,
  removrBackground,
  setremovrBackground,
}) => {

  const handlechg = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>

      <p className="text-sm text-gray-600">
        Get started with the personal information
      </p>

      <label className="block mt-4 cursor-pointer">
        {data?.image ? (
          <img
            src={
              typeof data.image === "string"
                ? data.image
                : URL.createObjectURL(data.image)
            }
            alt="user"
            className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80"
          />
        ) : (
          <div className="flex flex-row items-start gap-1">
            <User className="size-10 p-2 border rounded-full" />
            <span className=" align-middle">Upload user image</span>
          </div>
        )}

        <input
          type="file"
          accept="image/jpeg, image/png"
          className="hidden"
          onChange={(e) => {
            handlechg("image", e.target.files[0]);
          }}
        />
        
      </label>

      {typeof data?.image === "object" && (
        <div className="flex flex-col gap-1 pl-2 mt-3 text-sm">
          <p>Remove Background</p>

          <label className="relative inline-flex items-center cursor-pointer gap-3">
            <input
              type="checkbox"
              className="sr-only peer"
              onChange={() =>
                setremovrBackground((prev) => !prev)
              }
              checked={removrBackground}
            />

            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-600 transition"></div>

            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
          </label>
        </div>
      )}
    </div>
  );
};

export default Persnolinfoform;