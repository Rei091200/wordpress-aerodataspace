<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

define('WP_MEMORY_LIMIT', '512M');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '3>pi`bOV)~Ez+EFo0=QnQ@_HkO8CdD:mPbIf<.Y~Gq^S#a.~_*3Q[oDuLfQyc=5s' );
define( 'SECURE_AUTH_KEY',  'e5A{`< z>r B}v*8NeDj(UjI#O)kg<gzKOAy@Hxo;ZC*e;#soUSq@MLc}{;=u?TY' );
define( 'LOGGED_IN_KEY',    '%la0i7zsvz?q3>Dr@5V3j9,u&C ^iPB|.l*qi2_Z+JZ-&K##h.b?|tcak7Sno[o1' );
define( 'NONCE_KEY',        '%QBdk~;7LrH}4_-1`a[1?#{!F$-vE^MCyswPiv,~0q@Ttd|S[w0nH/]|?PA&Bt{M' );
define( 'AUTH_SALT',        's9^AXnnh}FvAAd%C$bT R.W /DUq)e,[h3%qk(jFC].cM PDTN6ZFC[)|31,Xihe' );
define( 'SECURE_AUTH_SALT', 'o8u:rU2<zseW/tHBN[4kC*$fC<s/=,sGQFb1E}5xrJS,B@A2m$gVj<`{ ;9}78b[' );
define( 'LOGGED_IN_SALT',   'ejZhYQ@pk@E%JSnT`0CL8R7Wk5Frv`2g#52[Zu|=/ZD5!}:KdP?&5:|;R#C|QZhs' );
define( 'NONCE_SALT',       'Ip9+ZGzSEl[~W_h|y*xZ$Y*na5nze.{E$,_j,0hH{DC4sHJ,oU(Zh$WI6i6gBjj=' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
