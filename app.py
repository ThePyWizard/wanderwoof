import streamlit as st
import viewmap

# Set the page title, icon, and layout
st.set_page_config(page_title="WanderWoof", page_icon=":dog:", layout="wide")


st.title("WanderWoof")
st.subheader("Mapping the Path to Rescue.")

# Create a button to toggle between map and the main page
if st.button("Report Now"):
    st.write("You clicked 'Report Now'. You can add your reporting logic here.")

# Use Streamlit session state to manage the page state
if 'view_map' not in st.session_state:
    st.session_state.view_map = False

if st.button("View Heat Map"):
    st.session_state.view_map = True

# Conditional rendering based on the session state
if st.session_state.view_map:
    viewmap.main()
