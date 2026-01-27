import DiaryModel from "../models/diary.js";

// Get all diary entries
export const getDiaries = async (req, res) => {
  try {
    // Find all todos
    const Diaries = await DiaryModel.find({});

    // Return todos
    return res.status(200).json(Diaries);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create a new diary entry
export const createDiary = async (req, res) => {
  try {
    const { date, diaryContent, moodSelect, tagSelect, weekday } = req.body;

    // Basic validation: ensure required fields exist
    if (!date || !diaryContent || !moodSelect || !tagSelect) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newDiary = await DiaryModel.create({
      date,
      diaryContent,
      moodSelect,
      tagSelect,
      weekday,
    });

    return res.status(201).json(newDiary);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

// Update an existing diary entry
export const updateDiary = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, diaryContent, moodSelect, tagSelect, weekday } = req.body;

    const existedDiary = await DiaryModel.findById(id);
    if (!existedDiary) {
      return res.status(404).json({ message: "Diary not found" });
    }

    // Only update fields when they are provided to avoid overwriting with undefined
    if (date !== undefined) existedDiary.date = date;
    if (diaryContent !== undefined) existedDiary.diaryContent = diaryContent;
    if (moodSelect !== undefined) existedDiary.moodSelect = moodSelect;
    if (tagSelect !== undefined) existedDiary.tagSelect = tagSelect;
    if (weekday !== undefined) existedDiary.weekday = weekday;

    await existedDiary.save();
    console.log("edit saved");
    return res.status(200).json(existedDiary);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// Delete a diary entry
export const deleteDiary = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the id is valid
    const existedDiary = await DiaryModel.findById(id);
    //console.log('Existed Diary:', existedDiary);
    if (!existedDiary) {
      return res.status(404).json({ message: "Diary not found!" });
    }
    // Delete the todo
    await DiaryModel.findByIdAndDelete(id);
    //console.log("Diary deleted successfully!");
    return res.status(200).json({ message: "Diary deleted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
