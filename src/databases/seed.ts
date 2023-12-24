import movieModel from "@/models/movies.models";
import seedData from "./seedData.json"

export const seedDatabase = async () => {
  await movieModel.deleteMany({});
  await movieModel.create(seedData);
}