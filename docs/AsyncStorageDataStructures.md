## AsyncStorage Data Structures Documentation

This document outlines the data structures and keys used for `AsyncStorage` across the application.

### 1. Privacy Settings (`PrivacySettingsScreen.jsx`)
- **Key Prefix**: `@PrivacySettings:`
- **Stored Data**: Individual privacy preferences.
- **Structure**:
    - `@PrivacySettings:isProfilePublic`: `boolean` (JSON string)
    - `@PrivacySettings:showReviews`: `boolean` (JSON string)
    - `@PrivacySettings:showSpecialties`: `boolean` (JSON string)
    - `@PrivacySettings:shareLocation`: `boolean` (JSON string)
    - `@PrivacySettings:trackActivity`: `boolean` (JSON string)

### 2. Pet Data (`Petscreen.jsx`)
- **Key Prefix**: `pet_`
- **Stored Data**: Details of individual pets.
- **Structure**:
    - `pet_{petData.id}`: `object` (JSON string)
        ```json
        {
            "id": "string",
            "name": "string",
            "type": "string",
            "breed": "string",
            "age": "number",
            "gender": "string",
            "imageUri": "string"
        }
        ```

### 3. Profile Images
- **Stored Data**: URI of the profile image.
- **Structure**:
    - `veterinarianProfileImage` (from `VeterinarianConfigurationScreen.jsx`): `string` (URI)
    - `profileImage` (from `ConfigurationScreen.jsx`): `string` (URI)
    - `employeeProfileImage` (from `EmployeeConfigurationScreen.jsx`): `string` (URI)
    - `adminProfileImage` (from `AdminConfigurationScreen.jsx`): `string` (URI)

### 4. Work Hours (`WorkHoursScreen.jsx`)
- **Key**: `@WorkHours`
- **Stored Data**: Work hours for each day of the week.
- **Structure**:
    - `@WorkHours`: `array` of `object` (JSON string)
        ```json
        [
            {
                "day": "string" (e.g., "Monday"),
                "active": "boolean",
                "startTime": "string" (ISO 8601 format for Date object),
                "endTime": "string" (ISO 8601 format for Date object)
            }
        ]
        ```

### 5. Holidays (`WorkHoursScreen.jsx`)
- **Key**: `@Holidays`
- **Stored Data**: List of holidays.
- **Structure**:
    - `@Holidays`: `array` of `string` (ISO 8601 format for Date object)
        ```json
        [
            "YYYY-MM-DDTHH:mm:ss.sssZ"
        ]
        ```

### 6. Chat Data (`ChatContext.jsx`)
- **Key**: `chats`
- **Stored Data**: Array of chat objects.
- **Structure**:
    - `chats`: `array` of `object` (JSON string)
        ```json
        [
            {
                "id": "string",
                "participants": ["string"],
                "messages": [
                    {
                        "id": "string",
                        "senderId": "string",
                        "text": "string",
                        "timestamp": "string" (ISO 8601 format)
                    }
                ]
            }
        ]
        ```

### 7. Appearance Settings (`AppearanceSettingsScreen.jsx`)
- **Key**: `appearanceSettings` (Proposed)
- **Stored Data**: User's appearance preferences (e.g., dark mode, text size).
- **Structure** (Proposed):
    - `appearanceSettings`: `object` (JSON string)
        ```json
        {
            "darkMode": "boolean",
            "textSize": "string" (e.g., "small", "medium", "large")
        }
        ```

### 8. Edit Profile Data (`EditProfileScreen.jsx`)
- **Key**: `userProfile` (Proposed)
- **Stored Data**: User's profile information.
- **Structure** (Proposed):
    - `userProfile`: `object` (JSON string)
        ```json
        {
            "name": "string",
            "phone": "string",
            "birthDate": "string" (ISO 8601 format for Date object),
            "profileImage": "string" (URI),
            "bio": "string"
        }
        ```

### 9. Notification Settings (`NotificationsSettingsScreen.jsx`)
- **Key**: `notificationSettings` (Proposed)
- **Stored Data**: User's notification preferences.
- **Structure** (Proposed):
    - `notificationSettings`: `object` (JSON string)
        ```json
        {
            "newAppointments": "boolean",
            "reminders": "boolean",
            "promotions": "boolean",
            "emailNotifications": "boolean"
        }
        ```