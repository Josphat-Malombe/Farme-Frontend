
<template>
  <div class="profile-container">
    <h2 class="profile-heading">Your Profile</h2>

    <!-- Display Mode -->
    <div v-if="!isEditing" class="profile-view">
      <div class="profile-pic">
        <img :src="profile.profile_picture_url || defaultImage" alt="Profile" class="profile-img" />

      </div>
      <div class="profile-details">
        <p class="profile-item"><span class="label">Full Name:</span> {{ profile.full_name }}</p>
        <p class="profile-item"><span class="label">Email:</span> {{ profile.email }}</p>
        <p class="profile-item"><span class="label">County:</span> {{ profile.county_name }}</p>
        <p class="profile-item"><span class="label">Constituency:</span> {{ profile.constituency_name }}</p>
        <p class="profile-item"><span class="label">Ward:</span> {{ profile.ward_name }}</p>
        <p class="profile-item"><span class="label">Language:</span> {{ profile.language_preference }}</p>
      </div>
      <button class="edit-btn" @click="enableEdit">Edit Profile</button>
    </div>

    <!-- Edit Mode -->
    <div v-else class="profile-edit">
      <form @submit.prevent="saveProfile" class="profile-form">
        <div class="form-group">
          <label for="full_name" class="form-label">Full Name</label>
          <input id="full_name" v-model="profile.full_name" type="text" class="form-input" />
        </div>
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input id="email" v-model="profile.email" type="email" class="form-input" />
        </div>
        <div class="form-group">
          <label for="phone_number" class="form-label">Phone Number</label>
          <input id="phone_number" v-model="profile.phone_number" type="text" class="form-input" />
        </div>
        <div class="form-group">
         <label for="county" class="form-label">County</label>
         <select v-model="profile.county" @change="onCountyChange" class="form-input">
          <option value="">Select County</option>
          <option v-for="c in counties" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
       </div>
        <div class="form-group">
          <label for="constituency" class="form-label">Constituency</label>
          <select v-model="profile.constituency" @change="onConstituencyChange" class="form-input">
             <option value="">Select Constituency</option>
             <option v-for="cc in constituencies" :key="cc.id" :value="cc.id">{{ cc.name }}</option>
          </select>
        </div>
        <div class="form-group">
           <label for="ward" class="form-label">Ward</label>
           <select v-model="profile.ward" class="form-input">
               <option value="">Select Ward</option>
               <option v-for="w in wards" :key="w.id" :value="w.id">{{ w.name }}</option>
           </select>
         </div>
        <div class="form-group">
          <label for="language_preference" class="form-label">Language Preference</label>
          <input id="language_preference" v-model="profile.language_preference" type="text" class="form-input" />
        </div>
        <div class="form-group">
          <label for="profile_picture" class="form-label">Profile Picture</label>
          <input id="profile_picture" type="file" @change="onFileChange" class="form-input file-input" />
        </div>
        <div v-if="imagePreview" class="preview">
          <p class="preview-label">Image Preview:</p>
          <img :src="imagePreview" alt="Preview" class="preview-img" />
        </div>
        <div class="btn-group">
          <button type="submit" class="save-btn">Save</button>
          <button type="button" class="cancel-btn" @click="cancelEdit">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';
import { getProfile, updateProfile } from '../services/profileService'
export default {
  data() {
    return {
      profile: {},
      isEditing: false,
      newProfilePic: null,
      imagePreview: null,
      defaultImage: '/profile.png', 

      counties: [],
      constituencies: [],
      wards: [],
    };
  },
  async mounted() {
    await this.loadProfile();
    await this.loadCounties();

     if (this.profile.county) {
      await this.loadConstituencies(this.profile.county);
    }
    if (this.profile.constituency) {
      await this.loadWards(this.profile.constituency);
    }
  },
  methods: {
    async loadProfile() {
      try {
        const res = await getProfile();
        this.profile = res.data;
      } catch (err) {
        console.error('Error loading profile:', err);
      }
    },
    async loadCounties() {
      try {
        const res = await api.get('/counties/');
        this.counties = res.data;
      } catch (err) {
        console.error('Failed to load counties', err);
      }
    },
    async loadConstituencies(countyId) {
      try {
        const res = await api.get(`/constituencies/?county=${countyId}`);
        this.constituencies = res.data;
      } catch (err) {
        console.error('Failed to load constituencies', err);
      }
    },
    async loadWards(constituencyId) {
      try {
        const res = await api.get(`/wards/?constituency=${constituencyId}`);
        this.wards = res.data;
      } catch (err) {
        console.error('Failed to load wards', err);
      }
    },
    onCountyChange() {
      this.profile.constituency = '';
      this.profile.ward = '';
      this.constituencies = [];
      this.wards = [];
      if (this.profile.county) {
        this.loadConstituencies(this.profile.county);
      }
    },
    onConstituencyChange() {
      this.profile.ward = '';
      this.wards = [];
      if (this.profile.constituency) {
        this.loadWards(this.profile.constituency);
      }
    },
    enableEdit() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
      this.imagePreview = null;
      this.newProfilePic = null;
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.newProfilePic = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },
    async saveProfile() {
      const dataToSend = { ...this.profile };
      if (this.newProfilePic) {
        dataToSend.profile_picture = this.newProfilePic;
      }
      console.log("data to send", dataToSend)

      try {
        await updateProfile(dataToSend);
        
        this.isEditing = false;
        this.imagePreview = null;
        await this.loadProfile();
        
      } catch (err) {
        console.error('Error updating profile:', err);
      }
    },
  },
};
</script>

<style scoped>
/* General Reset and Font */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background: #0f172a;
}

.profile-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 16px;
  background: #0f172a;
  color: #fff;
  border-radius: 12px;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Heading */
.profile-heading {
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  padding: 12px;
  background: #181818;
  border-bottom: 1px solid #333;
  margin-bottom: 16px;
}

/* Profile View */
.profile-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
}

.profile-pic {
  display: flex;
  justify-content: center;
}

.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #333;
  object-fit: cover;
}

.profile-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.profile-item {
  display: flex;
  font-size: 16px;
  color: #fff;
}

.label {
  font-weight: 500;
  color: #00ff99;
  width: 120px;
}

/* Edit Mode */
.profile-edit {
  width: 100%;
  padding: 16px;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 6px;
}

.form-input {
  padding: 10px 12px;
  border: none;
  border-radius: 24px;
  background: #1e1e1e;
  color: #fff;
  font-size: 16px;
  transition: box-shadow 0.2s ease;
}

.form-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 255, 153, 0.4);
}

.form-input::placeholder {
  color: #666;
}

.file-input {
  padding: 10px 0;
  background: transparent;
}

.preview {
  margin-top: 12px;
}

.preview-label {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 8px;
}

.preview-img {
  width: 160px;
  height: 160px;
  border-radius: 12px;
  object-fit: cover;
  border: 1px solid #333;
}

/* Buttons */
.edit-btn,
.save-btn,
.cancel-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.edit-btn,
.save-btn {
  background: #00ff99;
}

.edit-btn:hover,
.save-btn:hover {
  background: #00cc88;
  transform: scale(1.05);
}

.edit-btn:focus,
.save-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 255, 153, 0.4);
}

.cancel-btn {
  background: #555;
  color: #fff;
}

.cancel-btn:hover {
  background: #444;
  transform: scale(1.05);
}

.cancel-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(85, 85, 85, 0.4);
}

.btn-group {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-container {
    padding: 12px;
    width: 100vw;
  }

  .profile-heading {
    font-size: 20px;
  }

  .profile-img {
    width: 80px;
    height: 80px;
  }

  .profile-item {
    flex-direction: column;
  }

  .label {
    width: 100%;
    margin-bottom: 4px;
  }

  .edit-btn,
  .save-btn,
  .cancel-btn {
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }

  .btn-group {
    flex-direction: column;
    gap: 8px;
  }

  .cancel-btn {
    margin-left: 0;
  }

  .preview-img {
    width: 120px;
    height: 120px;
  }
}
</style>

