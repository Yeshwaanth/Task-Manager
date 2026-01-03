const Task = require('../models/Task')

exports.getTasks = async (req, res) => {
    const { page = 1, limit = 10, sort, completed, search } = req.query;

    const queryObject = { user: req.user };

    // Filtering
    if (completed !== undefined) {
        queryObject.completed = completed === "true";
    }

    // Searching
    if (search) {
        queryObject.title = { $regex: search, $options: "i" };
    }

    // Base query
    let query = Task.find(queryObject);

    // Sorting
    if (sort) {
        query = query.sort(sort.split(',').join(' '));
    }

    // Pagination
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(Number(limit));

    // Execute query
    const tasks = await query;

    res.json(tasks);
}

exports.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!task)
            return res.status(404).json({ message: 'Task not found' })
        res.json(task)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task)
        return res.status(404).json({ message: 'Task not found' })
    res.status(204).send()
}