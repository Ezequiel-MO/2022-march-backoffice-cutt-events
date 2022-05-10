import { useParams } from "react-router-dom";
import UpdateLogic from "./UpdateLogic";

const HotelUpdate = () => {
  let params = useParams();
  const {
    handleSubmit,
    originalHotel,
    updatedHotel,
    isInput,
    handleUpdateHotel,
    setEditFieldStatus,
  } = UpdateLogic(params);

  const renderOriginalHotel = (
    <>
      {Object.keys(originalHotel).map((field) => (
        <div
          key={`${field}`}
          className="relative px-6 py-2 border-b border-gray-200 w-full rounded-t-lg cursor-pointer"
        >
          {isInput[field] ? (
            <div>
              <p className="font-bold">{field} :</p>
              {field === "textContent" || field === "introduction" ? (
                <textarea
                  className="w-full h-32 mt-2"
                  placeholder={`New ${field}  ...`}
                  onBlur={() => setEditFieldStatus(`${field}`, false)}
                  name={`${field}`}
                  value={updatedHotel[`${field}`]}
                  onChange={handleUpdateHotel}
                  autoFocus
                />
              ) : (
                <input
                  type="text"
                  placeholder={`New ${field}  ...`}
                  onBlur={() => setEditFieldStatus(`${field}`, false)}
                  name={`${field}`}
                  value={updatedHotel[`${field}`]}
                  onChange={handleUpdateHotel}
                  className="absolute right-3.5 bottom-2 w-2/3"
                  autoFocus
                />
              )}
            </div>
          ) : (
            <div onClick={() => setEditFieldStatus(`${field}`, true)}>
              {updatedHotel[`${field}`]
                ? `${field} : ${updatedHotel[field]}`
                : `${field} : ${originalHotel[field]}`}
            </div>
          )}
        </div>
      ))}
    </>
  );

  return (
    <>
      <h1 className="text-2xl mb-4 indent-8">Original Hotel</h1>
      <form
        onSubmit={handleSubmit}
        className="flex align-center justify-around w-3/4 mx-auto"
      >
        <div className="bg-white rounded-lg border border-gray-200 w-1/2 text-white-50">
          {renderOriginalHotel}
        </div>
        <button
          className="h-12 px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          type="submit"
        >
          Update and Save
        </button>
      </form>
    </>
  );
};

export default HotelUpdate;
