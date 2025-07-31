// Add to donor navigation items
{user?.role === 'donor' && (
  <Link
    to="/my-feedback"
    className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
  >
    📝 My Feedback
  </Link>
)}