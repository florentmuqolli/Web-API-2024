const { pool } = require('../config/mysql');

exports.createMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const query = `INSERT INTO contact_messages (name, email, subject, message, status) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await pool.execute(query, [name, email, subject, message, 'pending']);

        res.status(201).json({
            success: true,
            message: 'Message saved successfully.',
            data: { id: result.insertId },
        });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error.' });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const query = `SELECT * FROM contact_messages ORDER BY created_at DESC`;
        const [messages] = await pool.execute(query);

        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error.' });
    }
};

exports.markAsDone = async (req, res) => {
    const { id } = req.params;
  
    try {
      const query = `UPDATE contact_messages SET status = 'done' WHERE id = ?`;
      await pool.execute(query, [id]);
  
      res.status(200).json({ success: true, message: 'Message marked as done' });
    } catch (error) {
      console.error('Error updating message status:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error.' });
    }
  };
  

exports.deleteMessage = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `DELETE FROM contact_messages WHERE id = ?`;
        const [result] = await pool.execute(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: 'Message not found.' });
        }

        res.status(200).json({ success: true, message: 'Message deleted successfully.' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error.' });
    }
};
