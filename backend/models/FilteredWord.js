import mongoose from 'mongoose';

const filteredWordSchema = mongoose.Schema({
  word: { type: String, unique: true, required: true },
});

const FilteredWord = mongoose.model('FilteredWord', filteredWordSchema);
export default FilteredWord;
