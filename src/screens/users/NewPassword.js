const NewPassword = () => {
  return (
    <>
      <h1 className="font-black text-4xl capitalize">
        Reset <span className="text-white-100">your password</span>
      </h1>
      <form className="my-10 bg-gray-50 rounded-lg px-10 py-5">
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Insert your new password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          />
        </div>

        <input
          type="submit"
          value="Save New password"
          className="my-5 text-white-100 bg-orange-50 w-full py-2 uppercase font-bold rounded hover:cursor-pointer hover:bg-white-100 hover:text-orange-50 transition-colors"
        />
      </form>
    </>
  );
};

export default NewPassword;
