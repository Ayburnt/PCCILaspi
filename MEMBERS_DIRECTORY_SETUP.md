# Members Directory - Sanity CMS Integration

## Overview
The Members Directory now uses Sanity CMS as the backend for content management. This allows you to easily add, edit, and manage member profiles through Sanity Studio.

## Setup Instructions

### 1. Start Sanity Studio

Navigate to the backend folder and start the Sanity Studio:

```powershell
cd backend
npm install
npm run dev
```

Sanity Studio will be available at `http://localhost:3333`

### 2. Deploy Sanity Studio (Optional)

To deploy your Sanity Studio to the cloud:

```powershell
cd backend
sanity deploy
```

This will give you a hosted studio URL that you can access from anywhere.

### 3. Start Frontend

In a separate terminal, start the frontend:

```powershell
cd frontend
npm install
npm run dev
```

## Content Management

### Adding a New Member

1. Open Sanity Studio (local or deployed)
2. Click on "Members Directory" in the sidebar
3. Click "Create new Member"
4. Fill in the required fields:
   - **Company Name** (required)
   - **Membership Type** (Corporate or Individual)
   - **Business Category** (select from dropdown)
   - **Short Description** (brief overview)
   - **Email Address** (required)
   - **Business Address** (required)
   - **Key Services** (add multiple services)

5. Optional fields:
   - **Company Logo** (upload an image)
   - **Company Overview** (detailed description for profile page)
   - **Phone Number**
   - **Website** (full URL with https://)
   - **Member Since** (year joined)
   - **Key Representative** (name, position, and photo)
   - **Business Hours** (hours for each day of the week)
   - **Featured Member** (highlight in directory)
   - **Status** (Active/Inactive)

6. Click "Publish" to make the member visible on the website

### Editing a Member

1. Go to "Members Directory" in Sanity Studio
2. Click on the member you want to edit
3. Make your changes
4. Click "Publish" to save changes

### Managing Member Status

- Set **Status** to "Active" to show the member in the directory
- Set **Status** to "Inactive" to hide the member without deleting

## Schema Structure

The member schema includes:

- **Basic Information**: Company name, membership type, category
- **Contact Details**: Email, phone, website, address
- **Visual Assets**: Company logo, representative photo
- **Business Details**: Services, description, overview
- **Operating Information**: Business hours, member since
- **Management**: Featured flag, status

## Frontend Integration

The frontend automatically:
- Fetches all active members from Sanity
- Displays member logos if uploaded
- Shows loading states while fetching data
- Falls back to demo data if Sanity is unavailable
- Handles errors gracefully

### Key Features:

1. **MembersDirectory.jsx**
   - Real-time data from Sanity
   - Search and filter functionality
   - Responsive card layout
   - Logo display support

2. **MemberProfile.jsx**
   - Detailed member information
   - Company overview and services
   - Key representative details
   - Business hours display
   - Contact information with action buttons

## API Configuration

Your Sanity client is configured in `frontend/src/sanityClient.js`:

```javascript
projectId: '2svpsi6g'
dataset: 'production'
useCdn: true
apiVersion: '2023-05-03'
```

## Image Handling

Images are automatically optimized using Sanity's image pipeline:
- Logos are resized to 200x200px for profile pages
- Logos are resized to 100x100px for directory cards
- Representative photos are optimized for display

## Troubleshooting

### Members not showing up?
1. Check that members have `status: "active"` in Sanity
2. Verify the Sanity client configuration
3. Check browser console for errors
4. Ensure you've published the member (not just saved as draft)

### Images not loading?
1. Verify images are uploaded in Sanity Studio
2. Check that the image field names match the schema
3. Ensure `urlFor()` function is working properly

### Changes not reflecting?
1. Make sure to click "Publish" in Sanity Studio (not just save)
2. Clear browser cache
3. Check if CDN needs time to update (set `useCdn: false` for instant updates during development)

## Next Steps

1. Add more members through Sanity Studio
2. Upload company logos for better visual representation
3. Customize the member categories in `backend/schemaTypes/member.js`
4. Add more business hours or custom fields as needed
5. Deploy Sanity Studio for team access

## Support

For Sanity-specific questions, visit: https://www.sanity.io/docs
