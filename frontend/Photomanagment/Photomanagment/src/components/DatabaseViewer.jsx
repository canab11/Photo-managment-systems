import { useEffect, useState } from 'react';
import api from '../api/api';

function DatabaseViewer() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState(null);
  const [error, setError] = useState(null);

  const endpoints = [
    { name: 'Users', path: '/Users', icon: '👥' },
    { name: 'Albums', path: '/Albums', icon: '📁' },
    { name: 'Photos', path: '/Photos', icon: '📷' },
    { name: 'Categories', path: '/Categories', icon: '🏷️' },
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const results = {};

        for (const endpoint of endpoints) {
          try {
            const res = await api.get(endpoint.path);
            results[endpoint.name] = res.data;
          } catch (err) {
            results[endpoint.name] = { error: err.message };
          }
        }

        setData(results);
        if (Object.keys(results).length > 0) {
          setSelectedTable(endpoints[0].name);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const formatJson = (obj) => {
    return JSON.stringify(obj, null, 2);
  };

  const getTableStructure = (tableData) => {
    if (!Array.isArray(tableData) || tableData.length === 0) {
      return null;
    }
    return Object.keys(tableData[0]);
  };

  if (loading) {
    return (
      <div className="p-8 bg-blue-50 rounded-lg">
        <p className="text-lg">⏳ Loading database structure...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 rounded-lg">
        <p className="text-red-600">❌ Error: {error}</p>
      </div>
    );
  }

  const selectedData = data[selectedTable];
  const columns = selectedData && Array.isArray(selectedData) ? getTableStructure(selectedData) : null;

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-3xl font-bold mb-6">🗄️ Database Structure</h2>

      {/* Table Selector */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {endpoints.map((endpoint) => (
          <button
            key={endpoint.name}
            onClick={() => setSelectedTable(endpoint.name)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedTable === endpoint.name
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            {endpoint.icon} {endpoint.name}
          </button>
        ))}
      </div>

      {/* Data Display */}
      {selectedData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Table Structure */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">📋 Columns</h3>
            {columns ? (
              <div className="space-y-2">
                {columns.map((col) => (
                  <div key={col} className="p-2 bg-blue-50 rounded border-l-4 border-blue-600">
                    <p className="font-mono text-sm">{col}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
            {Array.isArray(selectedData) && (
              <p className="mt-4 text-sm text-gray-600">
                📊 Total Records: <span className="font-bold text-blue-600">{selectedData.length}</span>
              </p>
            )}
          </div>

          {/* Sample Data */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">📄 Sample Data</h3>
            <div className="overflow-auto max-h-96 bg-gray-900 p-3 rounded text-green-400 font-mono text-xs">
              <pre>{formatJson(selectedData?.slice(0, 3) || selectedData)}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {selectedData?.error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg mt-4">
          <p className="text-red-600 font-semibold">⚠️ Error fetching data:</p>
          <p className="text-red-500 text-sm">{selectedData.error}</p>
        </div>
      )}
    </div>
  );
}

export default DatabaseViewer;
