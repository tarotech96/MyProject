/**
 * 
 */
package global.testingsystem.service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

/**
 * @author admin
 *
 */
@Service
public class JwtService{
	public static final String USERNAME = "username";
	public static final String ROLE = "role";
	public static final String SECRET_KEY = "11111111111111111111111111111111";
	public static final int EXPIRE_TIME = 18000000;
	private Logger log = Logger.getLogger(JwtService.class);
	@Autowired
	private UsersService usersService;

	public String generateTokenLogin(String username) throws ParseException {
		String token = null;
		String roleToke = "";
		List<String> listRoleOfUser = usersService.getListRoleOfUser(username);
		for (String role : listRoleOfUser) {
			roleToke += role + ",";
		}
		roleToke=roleToke.substring(0, roleToke.length()-1);
		try {
			// Create HMAC signer
			JWSSigner signer = new MACSigner(generateShareSecret());
			JWTClaimsSet.Builder builder = new JWTClaimsSet.Builder();
			builder.claim(USERNAME, username);
			builder.claim(ROLE, roleToke);
			builder.expirationTime(generateExpirationDate());

			JWTClaimsSet claimsSet = builder.build();
			SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);
			// Apply the HMAC protection
			signedJWT.sign(signer);
			// Serialize to compact form, produces something like
			// eyJhbGciOiJIUzI1NiJ9.SGVsbG8sIHdvcmxkIQ.onO9Ihudz3WkiauDO2Uhyuz0Y18UASXlSc1eS0NkWyA
			token = signedJWT.serialize();

		} catch (Exception e) {
			// TODO Auto-generated catch block
			
			log.info(e);

		}
		return token;
	}

	private JWTClaimsSet getClaimsFromToken(String token) {
		JWTClaimsSet claims = null;
		try {
			SignedJWT signedJWT = SignedJWT.parse(token);
			JWSVerifier verifier = new MACVerifier(generateShareSecret());
			if (signedJWT.verify(verifier)) {
				claims = signedJWT.getJWTClaimsSet();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return claims;
	}

	private Date generateExpirationDate() {
		return new Date(System.currentTimeMillis() + EXPIRE_TIME);
	}

	private Date getExpirationDateFromToken(String token) {
		Date expiration = null;
		JWTClaimsSet claims = getClaimsFromToken(token);
		expiration = claims.getExpirationTime();
		return expiration;
	}

	public String getUsernameFromToken(String token) {
		String username = null;
		try {
			JWTClaimsSet claims = getClaimsFromToken(token);
			username = claims.getStringClaim(USERNAME);
		} catch (Exception e) {
			return null;
		}
		return username;
	}
	
	public String getRoleFromToken(String token) {
		String username = null;
		try {
			JWTClaimsSet claims = getClaimsFromToken(token);
			username = claims.getStringClaim(ROLE);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return username;
	}

	private byte[] generateShareSecret() {
		// Generate 256-bit (32-byte) shared secret
		byte[] sharedSecret = new byte[32];
		sharedSecret = SECRET_KEY.getBytes();
		return sharedSecret;
	}

	private Boolean isTokenExpired(String token) {
		try {
		   Date expiration = getExpirationDateFromToken(token);
		   return expiration.before(new Date());
		} catch (Exception e) {
			// TODO: handle exception
			return false;
		}
	}

	public int  validateTokenLogin(String token) {
		String username = getUsernameFromToken(token);

		System.out.println("isTokenExpired : " + isTokenExpired(token));
		System.out.println("username != null : " + username != null);
		if (isTokenExpired(token) && username != null) {
			System.out.println("validateTokenLogin_case_1: token die");
			return 1;
		}
		System.out.println("validateTokenLogin_case_2: token live");
		return 2;
	}

}
