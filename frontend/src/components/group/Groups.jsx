import React, { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import DashboardSidebar from '../dashboard/DashboardSidebar';
import RightSidebar from '../chat/RightSidebar';
import Hero from '../common/Hero';
import GroupCard from '../group/GroupCard';
import axios from 'axios';

const Groups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/groups');
        setGroups(res.data);
      } catch (err) {
        console.error('Błąd pobierania grup:', err);
      }
    };

    fetchGroups();
  }, []);

  return (
    <Layout leftSidebar={<DashboardSidebar />} rightSidebar={<RightSidebar />}>
      <Hero slug="groups" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            name={group.name}
            description={group.description}
            slug={group.slug}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Groups;
