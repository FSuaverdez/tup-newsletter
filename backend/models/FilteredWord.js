import mongoose from 'mongoose';

const filteredWordSchema = mongoose.Schema({
  word: String,
});

const FilteredWord = mongoose.model('FilteredWord', filteredWordSchema);
export default FilteredWord;
