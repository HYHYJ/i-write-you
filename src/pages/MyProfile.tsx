import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { User } from '@supabase/supabase-js';

function MyProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [hotelName, setHotelName] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user: ', error);
    } else if (data) {
      setUser(data.user);
      fetchHotelName(data.user);
    }
  };

  const fetchHotelName = async (user: User) => {
    if (user) {
      const { data, error } = await supabase
        .from('userInfo')
        .select('hotelName')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching hotel name: ', error);
      } else if (data) {
        setHotelName(data.hotelName);
      }
    }
  };

  const updateUser = async () => {
    if (!hotelName.trim()) {
      alert('호텔 이름을 입력해주세요.');
      return;
    }

    if (user) {
      const { data, error } = await supabase.from('userInfo').upsert([
        {
          id: user.id,
          userId: user.id,
          userEmail: user.email,
          hotelName,
        },
      ]);

      if (error) {
        console.error('Error updating user: ', error);
      } else {
        console.log('User updated successfully: ', data);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHotelName(e.target.value);
  };

  return (
    <div>
      <h2>사용자 프로필</h2>
      <input type="text" value={hotelName} onChange={handleChange} />
      <button type="button" onClick={updateUser}>
        입력
      </button>
    </div>
  );
}

export default MyProfile;
