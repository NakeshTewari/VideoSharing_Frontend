import React from 'react'

const Your_channel = () => {
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.profile}>
          <div style={styles.avatar}>N</div>
          <div style={styles.profileInfo}>
            <div style={styles.channelText}>Your channel</div>
            <div style={styles.channelName}>NAKESH TEWARI</div>
          </div>
        </div>
        <nav>
          <ul style={styles.navList}>
            {[
              { icon: '📊', label: 'Analytics' },
              { icon: '👥', label: 'Community' },
              { icon: '📝', label: 'Subtitles' },
              { icon: '©️', label: 'Copyright' },
              { icon: '💰', label: 'Earn' },
              { icon: '🎨', label: 'Customization' },
              { icon: '🎵', label: 'Audio library' },
              { icon: '⚙️', label: 'Settings' },
              { icon: '💬', label: 'Send feedback' },
            ].map((item, index) => (
              <li key={index} style={styles.navItem}>
                <a style={styles.navLink} href="#">
                  <span style={styles.icon}>{item.icon}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.title}>Channel analytics</h1>
          <div style={styles.headerButtons}>
            <button style={styles.button}>Advanced mode</button>
            <div style={styles.profileMenu}>
              <button style={styles.button}>N</button>
              <div style={styles.menu}>
                <a style={styles.menuItem} href="#">Profile</a>
                <a style={styles.menuItem} href="#">Logout</a>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.searchContainer}>
          <input style={styles.searchInput} placeholder="Search across your channel" type="text" />
        </div>
        <div style={styles.analyticsCard}>
          <div style={styles.analyticsHeader}>
            <h2 style={styles.analyticsTitle}>Your channel didn’t get any views in the last 28 days</h2>
            <div style={styles.dateText}>Nov 3 – 30, 2024</div>
          </div>
          <div style={styles.analyticsContent}>
            <div style={styles.metrics}>
              {["Views", "Watch time (hours)", "Subscribers"].map((item, index) => (
                <div style={styles.metric} key={index}>
                  <div style={styles.metricLabel}>{item}</div>
                  <div style={styles.metricValue}>—</div>
                </div>
              ))}
            </div>
            <div style={styles.graphContainer}>
              <img
                alt="Graph showing no views in the last 28 days"
                height="200"
                src="https://storage.googleapis.com/a1aa/image/4ne12y1iXDRuUyIeMMpYCoMPNKLhyKrrTe66FnAXml8DyJtnA.jpg"
                width="600"
              />
              <button style={styles.button}>See more</button>
            </div>
            <div style={styles.realtimeContainer}>
              <div style={styles.realtimeCard}>
                <div style={styles.realtimeLabel}>Realtime</div>
                <div style={styles.realtimeStatus}>Updating live</div>
                <div style={styles.realtimeValue}>—</div>
                <button style={styles.button}>See live count</button>
              </div>
              <div style={styles.realtimeCard}>
                <div style={styles.realtimeValue}>0</div>
                <div style={styles.realtimeLabel}>Views · Last 48 hours</div>
                <button style={styles.button}>See more</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#121212', // Dark Grayish Black
      color: '#FFFFFF', // White
    },
    sidebar: {
      width: '256px',
      backgroundColor: '#1E1E1E', // Blackish Gray
      padding: '16px',
    },
    profile: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '24px',
    },
    avatar: {
      backgroundColor: '#2C2C2C', // Darker Gray
      borderRadius: '50%',
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#FFFFFF', // White
    },
    profileInfo: {
      marginLeft: '16px',
    },
    channelText: {
      fontSize: '14px',
      color: '#BBBBBB', // Light Gray
    },
    channelName: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#FFFFFF', // White
    },
    navList: {
      listStyleType: 'none',
      padding: '0',
    },
    navItem: {
      marginBottom: '16px',
    },
    navLink: {
      display: 'flex',
      alignItems: 'center',
      color: '#FFFFFF', // White
      textDecoration: 'none',
      transition: 'color 0.2s',
    },
    icon: {
      marginRight: '8px',
    },
    mainContent: {
      flex: 1,
      padding: '24px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#FFFFFF', // White
    },
    headerButtons: {
      display: 'flex',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#1E1E1E', // Blackish Gray
      color: '#FFFFFF', // White
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      marginRight: '16px',
    },
    profileMenu: {
      position: 'relative',
    },
    menu: {
      position: 'absolute',
      right: '0',
      marginTop: '8px',
      width: '192px',
      backgroundColor: '#2C2C2C', // Darker Gray
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      display: 'none',
    },
    menuItem: {
      display: 'block',
      padding: '8px 16px',
      color: '#FFFFFF', // White
      textDecoration: 'none',
      transition: 'color 0.2s',
    },
    searchContainer: {
      marginBottom: '24px',
    },
    searchInput: {
      backgroundColor: '#1E1E1E', // Blackish Gray
      color: '#FFFFFF', // White
      padding: '8px 16px',
      borderRadius: '8px',
      width: '100%',
      border: 'none',
    },
    analyticsCard: {
      backgroundColor: '#2C2C2C', // Darker Gray
      padding: '24px',
      borderRadius: '8px',
    },
    analyticsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    },
    analyticsTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#FFFFFF', // White
    },
    dateText: {
      color: '#BBBBBB', // Light Gray
    },
    analyticsContent: {
      display: 'flex',
    },
    metrics: {
      flex: 1,
    },
    metric: {
      textAlign: 'center',
      marginBottom: '16px',
    },
    metricLabel: {
      color: '#BBBBBB', // Light Gray
    },
    metricValue: {
      fontSize: '32px',
      color: '#FFFFFF', // White
    },
    graphContainer: {
      backgroundColor: '#1E1E1E', // Blackish Gray
      padding: '16px',
      borderRadius: '8px',
      marginLeft: '16px',
      flex: 1,
    },
    realtimeContainer: {
      width: '256px',
      marginLeft: '16px',
    },
    realtimeCard: {
      backgroundColor: '#2C2C2C', // Darker Gray
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '16px',
    },
    realtimeLabel: {
      color: '#FFFFFF', // White
      marginBottom: '8px',
    },
    realtimeStatus: {
      color: '#BBBBBB', // Light Gray
    },
    realtimeValue: {
      fontSize: '32px',
      margin: '16px 0',
      color: '#FFFFFF', // White
    },
};
export default Your_channel;
