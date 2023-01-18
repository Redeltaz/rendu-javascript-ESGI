compose = docker compose
packer_path = ./infra/packer
terraform_path = ./infra/terraform

up:
	$(compose) kill
	$(compose) build
	$(compose) up -d

stop:
	$(compose) kill

ssh:
	$(compose) exec app sh

ami-validate:
	cd $(packer_path) && packer validate .

ami-format:
	packer fmt $(packer_path)/aws-ami.pkr.hcl

ami-build:
	packer build $(packer_path)/aws-ami.pkr.hcl

infra-plan:
	cd $(terraform_path) && terraform plan

infra-build:
	cd $(terraform_path) && terraform apply --auto-approve

infra-format:
	cd $(terraform_path) && terraform fmt
