package com.momato.member;

import javax.mail.MessagingException;
import javax.validation.constraints.Email;

import com.momato.common.dto.ResponseResult;
import com.momato.exception.InvalidRequestException;
import com.momato.member.dto.Member;

public interface MemberService {
	public Member retrieveMember(Member loginMem);
	public Member retrieveMemberById(String memberId);
	public ResponseResult createMember(Member member);
	public boolean jwtIsInvalid(String token);
	public void logout(String token);
	public ResponseResult retrieveMemberByIdExcludePass(String memberId);
	public ResponseResult deleteMember(String memberId);
	public ResponseResult updateMember(Member member);
	public ResponseResult createTempPass(@Email String memberId) throws MessagingException, InvalidRequestException;
}
