const Error = ({ mensaje }) => {
  return (
    <div className="bg-red-800 text-white-100 text-center p-3 uppercase font-bold mb-3 rounded-md mx-8">
      <p>{mensaje}</p>
    </div>
  );
};

export default Error;
