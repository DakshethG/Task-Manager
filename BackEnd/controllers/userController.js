const Task = require('../models/Task');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Get all users(Admin Only)
// @route   GET /api/users/
// @access  Private(Admin)
const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role:'member' }).select('-password');
        
        //Add task count to each user
        const usersWithTaskCount = await Promise.all(users.map(async (user) => {
            const pendingTasksCount = await Task.countDocuments({ assignedTo: user._id, status: 'pending' });
            const inProgressTasksCount = await Task.countDocuments({ assignedTo: user._id, status: 'in-progress' });
            const completedTasksCount = await Task.countDocuments({ assignedTo: user._id, status: 'completed' });
            return {
                ...user._doc, //Include all user fields 
                pendingTasksCount,
                inProgressTasksCount,
                completedTasksCount
            };
        }));

            res.json(usersWithTaskCount);
    } catch (error) {
        res.status(500).json({ message: 'Server error' , error: error.message });
    }
};

// @desc    Get users by ID
// @route   GET /api/users/:id
// @access  Private
const getUsersById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

// @desc    Delete a users(Admin Only)
// @route   DELETE /api/users/:id
// @access  Private/Admin

module.exports = { getUsers, getUsersById};