async function getMagazines() {
  try {
    const res = await fetch("http://localhost:4000/magazines");
    const data = await res.json();
    console.log("Magazines data:", data); // Add this console log

    return data;
  } catch (error) {
    console.error("Error fetching magazines:", error);
    throw error;
  }
}

export default async function MagazineList() {
  try {
    const magazines = await getMagazines();
    console.log("Magazines:", magazines); // Add this console log

    return (
      <>
        {magazines.map((magazine) => (
          <div key={magazine.id} className="border-2 border-red-300">
            <h3>{magazine.name}</h3>
            <h2>{magazine.avg_no_of_readers}</h2>
          </div>
        ))}
        {magazines.length === 0 && (
          <p className="text-center">No magazines available</p>
        )}
      </>
    );
  } catch (error) {
    console.error("Error in MagazineList component:", error);
    // Handle the error or render an error message as needed
    return <p className="text-center">Error loading magazines</p>;
  }
}
