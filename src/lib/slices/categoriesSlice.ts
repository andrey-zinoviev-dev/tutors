import { createSlice } from "@reduxjs/toolkit";

interface CategoryInterface {
  name: string;
}

const initialState: CategoryInterface[] = [
  {
    // id: "1",
    name: "Mathematics",
    // slug: "mathematics",
    // description: "Algebra, Calculus, Geometry",
  },
  {
    // id: "2",
    name: "Physics",
    // slug: "physics",
    // description: "Mechanics, Thermodynamics, Optics",
  },
  {
    // id: "3",
    name: "Chemistry",
    // slug: "chemistry",
    // description: "Organic, Inorganic, Physical",
  },
  {
    // id: "4",
    name: "Biology",
    // slug: "biology",
    // description: "Anatomy, Genetics, Ecology",
  },
  {
    // id: "5",
    name: "Computer Science",
    // slug: "computer-science",
    // description: "Programming, Algorithms, Data Structures",
  },
  {
    // id: "6",
    name: "Languages",
    // slug: "languages",
    // description: "English, Spanish, French, German",
  },
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
});

export default categoriesSlice.reducer;
