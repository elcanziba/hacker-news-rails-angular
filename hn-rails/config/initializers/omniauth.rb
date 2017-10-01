Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, "250785145421710", "35155e935bf98ba947210a17c9d5d9df",
  :scope => 'public_profile,email,user_birthday',
  :info_fields => 'id,about,birthday,email,first_name,gender,last_name'


  provider :google_oauth2, "232299641814-fi1qs340bg3mgaabuo9lkvq91ri080o2.apps.googleusercontent.com", "mcil_oPS2BwRVDYZGj_858mi"
end
