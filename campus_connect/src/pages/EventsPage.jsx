import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { httpClient } from '../config/AxiosHelper';
import { FaCalendar, FaMapMarkerAlt, FaUser, FaFilter } from 'react-icons/fa';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [category, setCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        eventDate: '',
        location: '',
        organizer: '',
        imageUrl: '',
        category: 'Technical',
        registrationLink: '',
    });

    useEffect(() => {
        fetchEvents();
        // Check if user is admin
        const userRole = localStorage.getItem('role');
        setIsAdmin(userRole === 'ADMIN');
    }, []);

    useEffect(() => {
        filterEvents();
    }, [events, category, searchTerm]);

    const fetchEvents = async () => {
        try {
            const res = await httpClient.get('api/public/events');
            setEvents(res.data);
        } catch (err) {
            toast.error('Failed to fetch events');
        }
    };

    const filterEvents = () => {
        let filtered = events;

        if (category) {
            filtered = filtered.filter(event => event.category === category);
        }

        if (searchTerm) {
            filtered = filtered.filter(event =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredEvents(filtered);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedEvent) {
                await httpClient.put(`api/events/${selectedEvent.id}`, formData);
                toast.success('Event updated successfully!');
            } else {
                await httpClient.post('api/events', formData);
                toast.success('Event created successfully!');
            }
            setShowModal(false);
            setFormData({
                title: '',
                description: '',
                eventDate: '',
                location: '',
                organizer: '',
                imageUrl: '',
                category: 'Technical',
                registrationLink: '',
            });
            setSelectedEvent(null);
            fetchEvents();
        } catch (err) {
            toast.error('Failed to save event');
        }
    };

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            eventDate: event.eventDate,
            location: event.location,
            organizer: event.organizer,
            imageUrl: event.imageUrl,
            category: event.category,
            registrationLink: event.registrationLink,
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await httpClient.delete(`api/events/${id}`);
                toast.success('Event deleted successfully!');
                fetchEvents();
            } catch (err) {
                toast.error('Failed to delete event');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8 font-sans">
            <Toaster position="top-center" />

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Campus Events
                </h1>
                <p className="text-center text-gray-600 text-lg">
                    Discover and participate in exciting campus activities
                </p>
            </div>

            {/* Filters & Search */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex flex-wrap gap-4 flex-1">
                            <div className="relative flex-1 min-w-[200px]">
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-w-[150px]"
                            >
                                <option value="">All Categories</option>
                                <option value="Technical">Technical</option>
                                <option value="Cultural">Cultural</option>
                                <option value="Sports">Sports</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {isAdmin && (
                            <button
                                onClick={() => {
                                    setSelectedEvent(null);
                                    setFormData({
                                        title: '',
                                        description: '',
                                        eventDate: '',
                                        location: '',
                                        organizer: '',
                                        imageUrl: '',
                                        category: 'Technical',
                                        registrationLink: '',
                                    });
                                    setShowModal(true);
                                }}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                + Create Event
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Events Grid */}
            <div className="max-w-7xl mx-auto">
                {filteredEvents.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">No events found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                {/* Event Image */}
                                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
                                    {event.imageUrl ? (
                                        <img
                                            src={event.imageUrl}
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <FaCalendar className="text-white text-6xl opacity-50" />
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-600">
                                            {event.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Event Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                                        {event.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {event.description}
                                    </p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <FaCalendar className="mr-2 text-blue-500" />
                                            <span>{event.eventDate}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <FaMapMarkerAlt className="mr-2 text-red-500" />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <FaUser className="mr-2 text-green-500" />
                                            <span>{event.organizer}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        {event.registrationLink && (
                                            <a
                                                href={event.registrationLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center px-4 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg text-sm font-medium"
                                            >
                                                Register
                                            </a>
                                        )}

                                        {isAdmin && (
                                            <>
                                                <button
                                                    onClick={() => handleEdit(event)}
                                                    className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all shadow-md text-sm font-medium"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(event.id)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-md text-sm font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
                            <h2 className="text-2xl font-bold">
                                {selectedEvent ? 'Edit Event' : 'Create New Event'}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Event Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInput}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter event title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInput}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Describe the event"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Event Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="eventDate"
                                        value={formData.eventDate}
                                        onChange={handleInput}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInput}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    >
                                        <option value="Technical">Technical</option>
                                        <option value="Cultural">Cultural</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Workshop">Workshop</option>
                                        <option value="Seminar">Seminar</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInput}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Event venue"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Organizer *
                                </label>
                                <input
                                    type="text"
                                    name="organizer"
                                    value={formData.organizer}
                                    onChange={handleInput}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Organizing body/person"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleInput}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Registration Link
                                </label>
                                <input
                                    type="url"
                                    name="registrationLink"
                                    value={formData.registrationLink}
                                    onChange={handleInput}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="https://forms.google.com/..."
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setSelectedEvent(null);
                                    }}
                                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg font-medium"
                                >
                                    {selectedEvent ? 'Update Event' : 'Create Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventsPage;
